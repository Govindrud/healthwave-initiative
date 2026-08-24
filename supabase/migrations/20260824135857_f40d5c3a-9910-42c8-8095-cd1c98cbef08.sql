CREATE TABLE public.counselor_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New session',
  mood TEXT,
  risk_flagged BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.counselor_sessions TO authenticated;
GRANT ALL ON public.counselor_sessions TO service_role;
ALTER TABLE public.counselor_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own counselor sessions"
ON public.counselor_sessions FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.counselor_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.counselor_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.counselor_messages TO authenticated;
GRANT ALL ON public.counselor_messages TO service_role;
ALTER TABLE public.counselor_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own counselor messages"
ON public.counselor_messages FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_counselor_messages_session ON public.counselor_messages(session_id, created_at);
CREATE INDEX idx_counselor_sessions_user ON public.counselor_sessions(user_id, updated_at DESC);

CREATE TRIGGER update_counselor_sessions_updated_at
BEFORE UPDATE ON public.counselor_sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();