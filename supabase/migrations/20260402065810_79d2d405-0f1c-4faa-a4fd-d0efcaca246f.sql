CREATE POLICY "Users can delete their own bookings"
ON public.bookings
FOR DELETE
TO public
USING (auth.uid() = user_id);