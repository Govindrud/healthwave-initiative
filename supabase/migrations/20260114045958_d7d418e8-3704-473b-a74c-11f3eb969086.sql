-- Create a secure view for orders that excludes sensitive payment credentials
-- This view can be used by the application instead of querying the orders table directly

-- First, let's create a public view that excludes sensitive Razorpay payment IDs
CREATE OR REPLACE VIEW public.orders_safe 
WITH (security_invoker=on) AS
SELECT 
  id,
  user_id,
  amount,
  items,
  shipping_address,
  created_at,
  updated_at,
  currency,
  status,
  notes,
  customer_name,
  customer_email,
  customer_phone
  -- Intentionally excluding: razorpay_order_id, razorpay_payment_id, secure_token
FROM public.orders;

-- Add a comment to document why this view exists
COMMENT ON VIEW public.orders_safe IS 'Safe view of orders table that excludes sensitive payment credentials (razorpay_order_id, razorpay_payment_id, secure_token) to prevent exposure of payment gateway data.';

-- The underlying orders table RLS policy is already correct:
-- (((auth.uid() IS NOT NULL) AND (auth.uid() = user_id)) OR ((user_id IS NULL) AND (secure_token IS NOT NULL) AND (secure_token = get_request_secure_token())))
-- This ensures authenticated users can only see their own orders and guest orders require the secure token.