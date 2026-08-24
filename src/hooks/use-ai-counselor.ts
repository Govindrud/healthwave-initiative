import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface CounselorMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CounselorSession {
  id: string;
  title: string;
  updated_at: string;
}

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-counselor`;

export const useAICounselor = (persona: string) => {
  const { user } = useAuth();
  const userId = user?.uid;

  const [messages, setMessages] = useState<CounselorMessage[]>([]);
  const [sessions, setSessions] = useState<CounselorSession[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const loadSessions = useCallback(async () => {
    if (!userId) {
      setSessions([]);
      return;
    }
    const { data, error } = await supabase
      .from('counselor_sessions')
      .select('id, title, updated_at')
      .order('updated_at', { ascending: false })
      .limit(20);
    if (!error && data) setSessions(data as CounselorSession[]);
  }, [userId]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const openSession = useCallback(async (id: string) => {
    setSessionId(id);
    const { data, error } = await supabase
      .from('counselor_messages')
      .select('role, content')
      .eq('session_id', id)
      .order('created_at', { ascending: true });
    if (!error && data) {
      setMessages(data.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })));
    }
  }, []);

  const startNewSession = useCallback(() => {
    setSessionId(null);
    setMessages([]);
  }, []);

  const persistMessage = useCallback(
    async (currentSessionId: string, role: 'user' | 'assistant', content: string) => {
      if (!userId) return;
      await supabase
        .from('counselor_messages')
        .insert({ session_id: currentSessionId, user_id: userId, role, content });
      await supabase
        .from('counselor_sessions')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentSessionId);
    },
    [userId]
  );

  const ensureSession = useCallback(
    async (firstMessage: string) => {
      if (!userId) return null;
      if (sessionId) return sessionId;
      const { data, error } = await supabase
        .from('counselor_sessions')
        .insert({
          user_id: userId,
          title: firstMessage.slice(0, 60) || 'New session',
          mood: persona,
        })
        .select('id, title, updated_at')
        .single();
      if (error || !data) return null;
      setSessionId(data.id);
      setSessions((prev) => [data as CounselorSession, ...prev]);
      return data.id;
    },
    [persona, sessionId, userId]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      const history: CounselorMessage[] = [...messages, { role: 'user', content: trimmed }];
      setMessages([...history, { role: 'assistant', content: '' }]);
      setIsStreaming(true);

      const activeSession = await ensureSession(trimmed);
      if (activeSession) await persistMessage(activeSession, 'user', trimmed);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;

        const response = await fetch(FUNCTION_URL, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ messages: history, persona }),
        });

        if (!response.ok || !response.body) {
          const detail = await response.json().catch(() => ({}));
          throw new Error(detail.error || 'Unable to reach the counsellor');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let assistantText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === '[DONE]') continue;
            try {
              const parsed = JSON.parse(payload);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                assistantText += delta;
                setMessages((prev) => {
                  const next = [...prev];
                  next[next.length - 1] = { role: 'assistant', content: assistantText };
                  return next;
                });
              }
            } catch {
              // ignore partial JSON chunks
            }
          }
        }

        if (!assistantText) {
          throw new Error('The counsellor did not respond. Please try again.');
        }
        if (activeSession) await persistMessage(activeSession, 'assistant', assistantText);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error((error as Error).message);
          setMessages((prev) => prev.filter((m, i) => !(i === prev.length - 1 && m.content === '')));
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [ensureSession, isStreaming, messages, persistMessage, persona]
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const deleteSession = useCallback(
    async (id: string) => {
      await supabase.from('counselor_sessions').delete().eq('id', id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (sessionId === id) startNewSession();
    },
    [sessionId, startNewSession]
  );

  return {
    messages,
    sessions,
    sessionId,
    isStreaming,
    isSignedIn: !!userId,
    sendMessage,
    stop,
    openSession,
    startNewSession,
    deleteSession,
  };
};
