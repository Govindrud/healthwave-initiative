-- Fix the broken guest orders RLS policy
-- The current policy has "OR false" which prevents secure token access

-- Drop the broken policy
DROP POLICY IF EXISTS "Guest orders viewable with secure token" ON public.orders;

-- Create a proper function to get secure token from request headers
CREATE OR REPLACE FUNCTION public.get_request_secure_token()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    current_setting('request.headers', true)::json->>'x-secure-token',
    ''
  );
$$;

-- Create proper RLS policy for orders that:
-- 1. Allows authenticated users to view their own orders
-- 2. Allows guest order access only via secure token passed in headers
CREATE POLICY "Orders viewable by owner or secure token"
ON public.orders
FOR SELECT
USING (
  -- Authenticated users can view their own orders
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Guest orders (user_id IS NULL) can be viewed if secure_token matches header
  (user_id IS NULL AND secure_token IS NOT NULL AND secure_token = public.get_request_secure_token())
);

-- Add index for secure token lookups for performance
CREATE INDEX IF NOT EXISTS idx_orders_secure_token ON public.orders(secure_token) WHERE secure_token IS NOT NULL;