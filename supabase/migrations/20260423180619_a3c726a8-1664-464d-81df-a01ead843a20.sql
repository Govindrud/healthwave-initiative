
-- Replace permissive denies with RESTRICTIVE policies for hard deny
DROP POLICY IF EXISTS "Deny client inserts on user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Deny client updates on user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Deny client deletes on user_roles" ON public.user_roles;

CREATE POLICY "Restrict user_roles inserts"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

CREATE POLICY "Restrict user_roles updates"
ON public.user_roles
AS RESTRICTIVE
FOR UPDATE
TO authenticated, anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Restrict user_roles deletes"
ON public.user_roles
AS RESTRICTIVE
FOR DELETE
TO authenticated, anon
USING (false);

-- Validate guest order inserts server-side
CREATE OR REPLACE FUNCTION public.validate_guest_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    -- Force safe defaults for guest orders
    NEW.status := 'pending';
    NEW.razorpay_payment_id := NULL;

    IF NEW.amount IS NULL OR NEW.amount <= 0 THEN
      RAISE EXCEPTION 'Invalid order amount';
    END IF;

    IF NEW.amount > 1000000 THEN
      RAISE EXCEPTION 'Order amount exceeds allowed limit';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_guest_order_trigger ON public.orders;
CREATE TRIGGER validate_guest_order_trigger
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.validate_guest_order();
