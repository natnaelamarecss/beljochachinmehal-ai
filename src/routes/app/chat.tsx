import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Send, Square, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ModelSelector } from "@/components/ai/ModelSelector";
import { streamChat } from "@/lib/api/client";
import { DEFAULT_MODEL, type ProductModelId } from "@/lib/ai/models";

export const Route = createFileRoute("/app/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — በልጆቻችን መሃል AI" },
      {
        name: "description",
        content: "Ask anything in Amharic or English and learn step by step with a friendly AI tutor.",
      },
      { property: "og:title", content: "AI Chat — በልጆቻችን መሃል AI" },
      { property: "og:description", content: "A patient bilingual AI tutor for every subject." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const QUICK = ["Explain", "Summarize", "Translate", "Give Hint", "Quiz Me", "Practice"];

function ChatPage() {
  const [model, setModel] = useState<ProductModelId>(DEFAULT_MODEL);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function send(text: string, history = messages) {
    if (!text.trim() || streaming) return;
    const next: Msg[] = [...history, { role: "user", content: text.trim() }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let acc = "";
      await streamChat(
        { model, messages: next },
        (delta) => {
          acc += delta;
          setMessages([...next, { role: "assistant", content: acc }]);
        },
        controller.signal,
      );
      if (!acc) setMessages([...next, { role: "assistant", content: "…" }]);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast.error(err instanceof Error ? err.message : "Something went wrong.");
        setMessages(next);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      <header className="flex items-center justify-between gap-3 border-b px-5 py-3">
        <ModelSelector value={model} onChange={setModel} />
        {streaming && (
          <Button variant="outline" size="sm" onClick={() => abortRef.current?.abort()}>
            <Square className="mr-1.5 h-3.5 w-3.5" /> Stop
          </Button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto w-full max-w-3xl space-y-5">
          {messages.length === 0 && (
            <div className="rounded-2xl border bg-card p-6 text-center">
              <p className="text-lg font-medium">ጠይቅ። ተማር። ፍጠር።</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Ask anything, in Amharic or English.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(`${q}: `)}
                    className="rounded-full border px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border bg-card shadow-soft"
                }`}
              >
                {m.content || (
                  <span className="text-muted-foreground">Thinking…</span>
                )}
                {m.role === "assistant" && m.content && !streaming && (
                  <div className="mt-3 flex gap-2 text-muted-foreground">
                    <button
                      aria-label="Copy response"
                      onClick={() => {
                        navigator.clipboard.writeText(m.content);
                        toast.success("Copied");
                      }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                      aria-label="Regenerate response"
                      onClick={() => {
                        const history = messages.slice(0, i - 1);
                        const prompt = messages[i - 1]?.content ?? "";
                        send(prompt, history);
                      }}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t bg-card/60 px-5 py-4">
        <form
          className="mx-auto flex w-full max-w-3xl items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            aria-label="Message"
            placeholder="Ask anything, upload a file, or create something..."
            className="max-h-40 min-h-11 resize-none rounded-2xl"
          />
          <Button type="submit" size="icon" className="h-11 w-11 rounded-2xl" disabled={streaming}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}