
-- Remove insecure header-based token policy that allowed spoofing
DROP POLICY IF EXISTS "Orders viewable by owner or secure token" ON public.orders;

-- Restrict SELECT to authenticated owners only
-- Guest orders must be retrieved server-side via edge function with service role key
CREATE POLICY "Authenticated users view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Replace the UPDATE policy to also forbid guest order updates from the client
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;

CREATE POLICY "Authenticated users update their own orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND user_id IS NOT NULL)
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- Explicitly deny anonymous updates (defense in depth)
REVOKE UPDATE ON public.orders FROM anon;
