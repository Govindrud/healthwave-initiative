import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bot,
  Check,
  Loader2,
  LifeBuoy,
  MessageSquarePlus,
  Send,
  ShieldCheck,
  Sparkles,
  Square,
  Trash2,
} from 'lucide-react';
import { useAICounselor } from '@/hooks/use-ai-counselor';

const PERSONAS = [
  { id: 'Empathetic listener', label: 'Empathetic listener', hint: 'Gentle reflection and validation' },
  { id: 'CBT coach', label: 'CBT coach', hint: 'Reframe unhelpful thoughts' },
  { id: 'Calm mentor', label: 'Calm mentor', hint: 'Grounding and breathing focus' },
  { id: 'Practical planner', label: 'Practical planner', hint: 'Small next steps and habits' },
];

const CAPABILITIES = [
  'Talk through stress, anxiety, sleep and relationship worries in private',
  'Get evidence-informed coping tools tailored to Indian family and work pressures',
  'Continue where you left off — every session is saved to your account',
];

const STARTERS = [
  "I've been feeling anxious about work all week",
  "I can't sleep and my mind keeps racing",
  'I want help setting boundaries with my family',
  'Guide me through a 5-minute grounding exercise',
];

const AICounselor: React.FC = () => {
  const [persona, setPersona] = useState(PERSONAS[0].id);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    sessions,
    sessionId,
    isStreaming,
    isSignedIn,
    sendMessage,
    stop,
    openSession,
    startNewSession,
    deleteSession,
  } = useAICounselor(persona);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input;
    setInput('');
    sendMessage(text);
  };

  return (
    <MainLayout
      title="AI Mental Health Counselor | MeantToHelp"
      description="Chat privately with MeantToHelp's AI mental health counselor for stress, anxiety and sleep support, with saved sessions and Indian crisis helplines built in."
    >
      <div className="bg-background pb-28">
        {/* Hero */}
        <section className="border-b bg-card">
          <div className="container mx-auto px-4 py-14">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Sparkles className="mr-1 h-3 w-3" /> New on MeantToHelp
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  AI Mental Health Counselor
                </h1>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                  A private, always-available first step. Talk it out, learn coping tools, and get
                  guided to the right human support when you need it.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <a href="#counselor-chat">Start a free session</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/doctors">Talk to a human therapist</Link>
                  </Button>
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" /> Private to your account. Not a substitute for
                  emergency care.
                </p>
              </div>

              <Card className="border-primary/20 bg-secondary/40 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">What you get</h2>
                    <p className="text-sm text-muted-foreground">Included with every account</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {CAPABILITIES.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Chat workspace */}
        <section id="counselor-chat" className="container mx-auto px-4 py-12">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Counselling style</h3>
                <div className="space-y-2">
                  {PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPersona(p.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${
                        persona === p.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <span className="block text-sm font-medium text-foreground">{p.label}</span>
                      <span className="block text-xs text-muted-foreground">{p.hint}</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Your sessions</h3>
                  <Button size="sm" variant="ghost" onClick={startNewSession}>
                    <MessageSquarePlus className="h-4 w-4" />
                  </Button>
                </div>
                {!isSignedIn ? (
                  <p className="text-xs text-muted-foreground">
                    <Link to="/auth" className="text-primary underline">
                      Sign in
                    </Link>{' '}
                    to save your sessions and continue later.
                  </p>
                ) : sessions.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No saved sessions yet.</p>
                ) : (
                  <ul className="space-y-1">
                    {sessions.map((s) => (
                      <li key={s.id} className="flex items-center gap-1">
                        <button
                          onClick={() => openSession(s.id)}
                          className={`flex-1 truncate rounded-md px-2 py-2 text-left text-xs ${
                            sessionId === s.id
                              ? 'bg-primary/10 text-foreground'
                              : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {s.title}
                        </button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          aria-label="Delete session"
                          onClick={() => deleteSession(s.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>

              <Card className="border-destructive/30 p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <LifeBuoy className="h-4 w-4 text-destructive" /> In crisis?
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Tele-MANAS 14416 · KIRAN 1800-599-0019
                </p>
                <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
                  <Link to="/crisis-helpline">Crisis helpline</Link>
                </Button>
              </Card>
            </div>

            {/* Conversation */}
            <Card className="flex h-[600px] flex-col overflow-hidden">
              <div className="flex items-center gap-3 border-b p-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Aashray</p>
                  <p className="text-xs text-muted-foreground">{persona}</p>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div ref={scrollRef} className="space-y-4 p-4">
                  {messages.length === 0 && (
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        Share whatever is on your mind — there is no wrong way to start.
                      </p>
                      <div className="mx-auto mt-5 grid max-w-lg gap-2 sm:grid-cols-2">
                        {STARTERS.map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className="rounded-lg border border-border p-3 text-left text-xs text-foreground transition-colors hover:bg-muted"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
                          m.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {m.content || (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex items-end gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type how you're feeling..."
                    rows={2}
                    className="resize-none"
                  />
                  {isStreaming ? (
                    <Button variant="outline" size="icon" onClick={stop} aria-label="Stop">
                      <Square className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      onClick={handleSend}
                      disabled={!input.trim()}
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Aashray offers support, not diagnosis or medication advice.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Sticky conversion bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-primary text-primary-foreground">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm font-medium">
              Need a human next? Get 40% off your first therapist session.
            </p>
            <Button size="sm" variant="secondary" asChild>
              <Link to="/doctors">Book a session</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AICounselor;
