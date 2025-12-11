-- Drop and recreate the guest order SELECT policy to prevent data exposure
-- Guest orders should only be viewable by the order creator using a secure mechanism

-- First, let's add a secure_token column to orders for guest order verification
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS secure_token text;

-- Create a function to generate secure tokens for guest orders
CREATE OR REPLACE FUNCTION public.generate_guest_order_token()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NULL AND NEW.secure_token IS NULL THEN
    NEW.secure_token := encode(gen_random_bytes(32), 'hex');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to auto-generate secure tokens for guest orders
DROP TRIGGER IF EXISTS generate_guest_order_token_trigger ON public.orders;
CREATE TRIGGER generate_guest_order_token_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_guest_order_token();

-- Add policy to allow guest order viewing only with the correct secure token
-- This uses a custom claim or RPC call pattern - for now, we'll restrict guest order viewing entirely
-- through the API and require the secure_token to be provided

CREATE POLICY "Guest orders viewable with secure token"
ON public.orders
FOR SELECT
USING (
  -- Authenticated users can view their own orders
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Guest orders cannot be viewed through normal API - must use secure token via RPC
  false
);

-- Drop the old policy that might allow broader access
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;