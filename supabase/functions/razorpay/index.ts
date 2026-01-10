import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Get allowed origins from environment or use defaults for the Lovable project
const getAllowedOrigins = (): string[] => {
  const customOrigin = Deno.env.get("ALLOWED_ORIGIN");
  const projectRef = Deno.env.get("SUPABASE_PROJECT_REF") || "qjzyuxqcujwjgfyttpjf";
  
  // Default allowed origins for this project
  const defaultOrigins = [
    `https://${projectRef}.lovable.app`,
    `https://${projectRef}.lovableproject.com`,
    "https://meanttohelp.com",
    "https://www.meanttohelp.com",
    "http://localhost:8080",
    "http://localhost:5173"
  ];
  
  if (customOrigin) {
    return [...defaultOrigins, customOrigin];
  }
  
  return defaultOrigins;
};

const getCorsHeaders = (origin: string | null): Record<string, string> => {
  const allowedOrigins = getAllowedOrigins();
  
  // Check if the request origin is in our allowed list
  const isAllowed = origin && allowedOrigins.some(allowed => 
    origin === allowed || origin.endsWith('.lovable.app') || origin.endsWith('.lovableproject.com')
  );
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
};

serve(async (req) => {
  const origin = req.headers.get("Origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { action, ...params } = await req.json();
    
    const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured");
    }

    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);

    // For order creation, optionally verify user authentication
    // This prevents abuse while still allowing guest checkout
    if (action === "create_order") {
      const { amount, currency = "INR", receipt, notes, user_id } = params;
      
      // Log order creation attempt (for monitoring abuse)
      console.log("Creating Razorpay order:", { 
        amount, 
        currency, 
        receipt, 
        hasUserId: !!user_id,
        origin: origin || 'unknown'
      });
      
      // Validate amount to prevent abuse
      if (!amount || amount <= 0 || amount > 10000000) {
        return new Response(
          JSON.stringify({ error: "Invalid amount" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          currency,
          receipt,
          notes: {
            ...notes,
            origin: origin || 'unknown',
            created_via: 'lovable_edge_function'
          },
        }),
      });

      const order = await response.json();
      
      if (!response.ok) {
        console.error("Razorpay order creation failed:", order);
        throw new Error(order.error?.description || "Failed to create order");
      }

      console.log("Razorpay order created:", order.id);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          order,
          key_id: RAZORPAY_KEY_ID 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "verify_payment") {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;
      
      console.log("Verifying payment:", { razorpay_order_id, razorpay_payment_id });
      
      // Create the expected signature
      const crypto = await import("https://deno.land/std@0.168.0/crypto/mod.ts");
      const encoder = new TextEncoder();
      const data = encoder.encode(`${razorpay_order_id}|${razorpay_payment_id}`);
      const key = encoder.encode(RAZORPAY_KEY_SECRET);
      
      const hmac = await crypto.crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      
      const signatureBuffer = await crypto.crypto.subtle.sign("HMAC", hmac, data);
      const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
      
      const isValid = expectedSignature === razorpay_signature;
      
      if (!isValid) {
        console.error("Payment signature verification failed");
        return new Response(
          JSON.stringify({ success: false, error: "Payment verification failed" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Fetch payment details from Razorpay
      const paymentResponse = await fetch(
        `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
        {
          headers: {
            "Authorization": `Basic ${auth}`,
          },
        }
      );

      const payment = await paymentResponse.json();
      
      console.log("Payment verified successfully:", payment.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          payment,
          verified: true 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "get_payment") {
      const { payment_id } = params;
      
      const response = await fetch(
        `https://api.razorpay.com/v1/payments/${payment_id}`,
        {
          headers: {
            "Authorization": `Basic ${auth}`,
          },
        }
      );

      const payment = await response.json();

      return new Response(
        JSON.stringify({ success: true, payment }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Razorpay function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});