CREATE TABLE public.counselor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  qualifications TEXT[] NOT NULL DEFAULT '{}',
  specialties TEXT[] NOT NULL DEFAULT '{}',
  session_rate NUMERIC(10,2) NOT NULL DEFAULT 0,
  session_duration_minutes INTEGER NOT NULL DEFAULT 50,
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT counselor_profiles_rate_nonnegative CHECK (session_rate >= 0),
  CONSTRAINT counselor_profiles_duration_valid CHECK (session_duration_minutes BETWEEN 15 AND 240)
);
GRANT SELECT, INSERT, UPDATE ON public.counselor_profiles TO authenticated;
GRANT ALL ON public.counselor_profiles TO service_role;
ALTER TABLE public.counselor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Counselors manage own profile"
ON public.counselor_profiles FOR ALL TO authenticated
USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'provider'::public.app_role))
WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'provider'::public.app_role));
CREATE POLICY "Admins view counselor profiles"
ON public.counselor_profiles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE TRIGGER update_counselor_profiles_updated_at
BEFORE UPDATE ON public.counselor_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.counselor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  counselor_id UUID NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  availability_status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT counselor_availability_status_valid CHECK (availability_status IN ('available', 'unavailable', 'booked')),
  CONSTRAINT counselor_availability_time_valid CHECK (ends_at > starts_at),
  CONSTRAINT counselor_availability_unique_slot UNIQUE (counselor_id, starts_at, ends_at)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.counselor_availability TO authenticated;
GRANT SELECT ON public.counselor_availability TO anon;
GRANT ALL ON public.counselor_availability TO service_role;
ALTER TABLE public.counselor_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view open future counselor slots"
ON public.counselor_availability FOR SELECT TO anon, authenticated
USING (availability_status = 'available' AND starts_at > now());
CREATE POLICY "Counselors view own availability"
ON public.counselor_availability FOR SELECT TO authenticated
USING (auth.uid() = counselor_id AND public.has_role(auth.uid(), 'provider'::public.app_role));
CREATE POLICY "Counselors create own availability"
ON public.counselor_availability FOR INSERT TO authenticated
WITH CHECK (auth.uid() = counselor_id AND public.has_role(auth.uid(), 'provider'::public.app_role));
CREATE POLICY "Counselors update own availability"
ON public.counselor_availability FOR UPDATE TO authenticated
USING (auth.uid() = counselor_id AND public.has_role(auth.uid(), 'provider'::public.app_role))
WITH CHECK (auth.uid() = counselor_id AND public.has_role(auth.uid(), 'provider'::public.app_role));
CREATE POLICY "Counselors delete own availability"
ON public.counselor_availability FOR DELETE TO authenticated
USING (auth.uid() = counselor_id AND public.has_role(auth.uid(), 'provider'::public.app_role));
CREATE TRIGGER update_counselor_availability_updated_at
BEFORE UPDATE ON public.counselor_availability
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_counselor_availability_start ON public.counselor_availability(counselor_id, starts_at);

ALTER TABLE public.bookings ADD COLUMN provider_id UUID;
ALTER TABLE public.bookings ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'unpaid';
ALTER TABLE public.bookings ADD CONSTRAINT bookings_payment_status_valid CHECK (payment_status IN ('unpaid', 'paid', 'refunded'));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
CREATE POLICY "Counselors view assigned bookings"
ON public.bookings FOR SELECT TO authenticated
USING (auth.uid() = provider_id AND public.has_role(auth.uid(), 'provider'::public.app_role));
CREATE POLICY "Counselors update assigned bookings"
ON public.bookings FOR UPDATE TO authenticated
USING (auth.uid() = provider_id AND public.has_role(auth.uid(), 'provider'::public.app_role))
WITH CHECK (auth.uid() = provider_id AND public.has_role(auth.uid(), 'provider'::public.app_role));
CREATE INDEX idx_bookings_provider_date ON public.bookings(provider_id, booking_date, booking_time);

CREATE OR REPLACE FUNCTION public.protect_booking_payment_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.role() IS DISTINCT FROM 'service_role' THEN
    IF TG_OP = 'INSERT' THEN
      IF NEW.provider_id IS NOT NULL OR NEW.payment_status <> 'unpaid' THEN
        RAISE EXCEPTION 'Booking assignment and payment status are managed by the booking service';
      END IF;
    ELSIF NEW.provider_id IS DISTINCT FROM OLD.provider_id OR NEW.payment_status IS DISTINCT FROM OLD.payment_status THEN
      RAISE EXCEPTION 'Booking assignment and payment status are managed by the booking service';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER protect_booking_payment_fields_trigger
BEFORE INSERT OR UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.protect_booking_payment_fields();

CREATE TABLE public.counselor_payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES public.bookings(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount_paise BIGINT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT counselor_payment_amount_positive CHECK (amount_paise > 0),
  CONSTRAINT counselor_payment_status_valid CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'))
);
GRANT ALL ON public.counselor_payment_records TO service_role;
ALTER TABLE public.counselor_payment_records ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_counselor_payment_provider ON public.counselor_payment_records(provider_id, created_at DESC);

CREATE TABLE public.counselor_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT counselor_payout_amount_positive CHECK (amount > 0),
  CONSTRAINT counselor_payout_status_valid CHECK (status IN ('pending', 'processing', 'paid', 'failed')),
  CONSTRAINT counselor_payout_booking_unique UNIQUE (booking_id)
);
GRANT SELECT ON public.counselor_payouts TO authenticated;
GRANT ALL ON public.counselor_payouts TO service_role;
ALTER TABLE public.counselor_payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Counselors view own payout history"
ON public.counselor_payouts FOR SELECT TO authenticated
USING (auth.uid() = provider_id AND public.has_role(auth.uid(), 'provider'::public.app_role));
CREATE POLICY "Admins view counselor payout history"
ON public.counselor_payouts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE INDEX idx_counselor_payouts_provider ON public.counselor_payouts(provider_id, created_at DESC);

CREATE TABLE public.counselor_payout_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payout_id UUID NOT NULL UNIQUE REFERENCES public.counselor_payouts(id) ON DELETE CASCADE,
  razorpay_transfer_id TEXT,
  razorpay_linked_account_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.counselor_payout_transactions TO service_role;
ALTER TABLE public.counselor_payout_transactions ENABLE ROW LEVEL SECURITY;
