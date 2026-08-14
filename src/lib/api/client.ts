import { supabase } from "@/integrations/supabase/client";

async function authHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeaders()) },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => null)) as
    | { data?: T; error?: { message?: string } }
    | null;
  if (!res.ok) {
    throw new Error(json?.error?.message ?? "Something went wrong. Please try again.");
  }
  return (json?.data ?? json) as T;
}

/** Streams /api/v1/chat and calls onDelta with each text chunk. */
export async function streamChat(
  body: unknown,
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch("/api/v1/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeaders()) },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new Error(err?.error?.message ?? "Something went wrong. Please try again.");
  }
  if (!res.body) throw new Error("Your connection seems slow. Please try again.");

  if (!res.headers.get("content-type")?.includes("text/event-stream")) {
    onDelta(await res.text());
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const parsed = JSON.parse(payload) as {
          choices?: { delta?: { content?: string } }[];
        };
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) onDelta(delta);
      } catch {
        /* partial frame, wait for more */
      }
    }
  }
}