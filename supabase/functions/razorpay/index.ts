import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    
    const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured");
    }

    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);

    if (action === "create_order") {
      const { amount, currency = "INR", receipt, notes } = params;
      
      console.log("Creating Razorpay order:", { amount, currency, receipt });
      
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
          notes,
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