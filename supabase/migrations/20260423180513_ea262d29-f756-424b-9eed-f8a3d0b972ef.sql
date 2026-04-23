
-- Prevent users from inserting/updating/deleting their own role rows
-- Only service_role (server-side) should manage roles; admins can be managed via SQL
CREATE POLICY "Deny client inserts on user_roles"
ON public.user_roles
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

CREATE POLICY "Deny client updates on user_roles"
ON public.user_roles
FOR UPDATE
TO authenticated, anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny client deletes on user_roles"
ON public.user_roles
FOR DELETE
TO authenticated, anon
USING (false);

-- Revoke direct table privileges from anon/authenticated as defense in depth
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
