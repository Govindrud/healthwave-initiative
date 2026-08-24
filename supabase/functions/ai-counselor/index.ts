// AI Mental Health Counselor - streaming chat via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are "Aashray", the AI Mental Health Counselor for MeantToHelp, an Indian mental wellness platform based in Pune.

How you work:
- Warm, calm, non-judgmental. Short paragraphs, plain language, no clinical jargon.
- Practise active listening: reflect feelings back, then ask ONE gentle open question.
- Offer practical, evidence-informed coping tools (CBT reframing, grounding, breathing 4-7-8, sleep hygiene, journaling prompts).
- Be culturally aware of Indian family, academic and workplace pressures.
- Never diagnose, never prescribe medication, never promise outcomes.
- If the person mentions self-harm, suicide, abuse or harming others: respond with immediate care, encourage contacting a trusted person, and share Indian helplines - Tele-MANAS 14416, KIRAN 1800-599-0019, AASRA +91-9820466726 - and suggest the platform's Crisis Helpline page.
- When useful, suggest MeantToHelp services: doctor consultations, student psychologists, peer support, de-addiction support, guided meditation.
- Keep replies under about 200 words unless the user asks for detail.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages = [], persona } = await req.json();

    const personaNote = persona
      ? `\n\nThe user has chosen the "${persona}" counselling style. Adapt your tone accordingly.`
      : "";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Lovable-API-Key": LOVABLE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        stream: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT + personaNote },
          ...messages.slice(-20).map((m: { role: string; content: string }) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: String(m.content ?? "").slice(0, 4000),
          })),
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Gateway error", response.status, detail);
      const message =
        response.status === 429
          ? "Too many requests right now. Please try again in a moment."
          : response.status === 402
            ? "AI usage limit reached. Please add credits to continue."
            : "The counsellor is unavailable right now. Please try again.";
      return new Response(JSON.stringify({ error: message }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("ai-counselor error", error);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
