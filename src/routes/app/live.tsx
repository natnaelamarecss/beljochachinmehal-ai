import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Mic, MicOff, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ModelSelector } from "@/components/ai/ModelSelector";
import { streamChat } from "@/lib/api/client";
import { DEFAULT_MODEL, type ProductModelId } from "@/lib/ai/models";

export const Route = createFileRoute("/app/live")({
  head: () => ({
    meta: [
      { title: "Live AI Tutor — በልጆቻችን መሃል AI" },
      {
        name: "description",
        content: "Speak with a live AI tutor in Amharic or English and learn out loud.",
      },
      { property: "og:title", content: "Live AI Tutor — በልጆቻችን መሃል AI" },
      { property: "og:description", content: "Talk to your AI tutor in real time." },
    ],
  }),
  component: LivePage,
});

const TUTORS = ["Study Tutor", "Math Tutor", "Science Tutor", "Coding Tutor", "Reading Tutor"];

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
};

function LivePage() {
  const [model, setModel] = useState<ProductModelId>(DEFAULT_MODEL);
  const [lang, setLang] = useState<"am-ET" | "en-US">("en-US");
  const [tutor, setTutor] = useState(TUTORS[0]!);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    window.speechSynthesis.speak(u);
  }

  async function ask(text: string) {
    setReply("");
    let acc = "";
    try {
      await streamChat(
        {
          model,
          messages: [
            {
              role: "user",
              content: `You are acting as a ${tutor} in a spoken live session. Reply in short spoken sentences.\n\nStudent said: ${text}`,
            },
          ],
        },
        (d) => {
          acc += d;
          setReply(acc);
        },
      );
      speak(acc);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function toggleMic() {
    const Ctor =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike })
        .SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike })
        .webkitSpeechRecognition;

    if (!Ctor) {
      toast.error("Live voice isn't supported in this browser yet. Try AI Chat instead.");
      return;
    }
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new Ctor();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      const text = Array.from(e.results as ArrayLike<ArrayLike<{ transcript: string }>>)
        .map((r) => r[0]?.transcript ?? "")
        .join(" ");
      setTranscript(text);
    };
    rec.onerror = () => setListening(false);
    rec.start();
    recRef.current = rec;
    setListening(true);
  }

  return (
    <div className="surface-night min-h-screen px-5 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-white">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-eth-red" /> Live Mode
          </h1>
          <ModelSelector value={model} onChange={setModel} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {TUTORS.map((t) => (
            <button
              key={t}
              onClick={() => setTutor(t)}
              className={`rounded-full border px-3 py-1 text-xs ${
                tutor === t ? "border-white text-white" : "border-white/20 text-white/60"
              }`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => setLang(lang === "en-US" ? "am-ET" : "en-US")}
            className="ml-auto rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
          >
            {lang === "en-US" ? "English" : "አማርኛ"}
          </button>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
          <p className="text-xs tracking-widest text-white/50 uppercase">You said</p>
          <p className="mt-1 min-h-6 text-sm">{transcript || "…"}</p>
          <p className="mt-5 text-xs tracking-widest text-white/50 uppercase">Tutor</p>
          <p className="mt-1 min-h-16 text-sm whitespace-pre-wrap">{reply || "…"}</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            size="lg"
            className="rounded-full"
            onClick={toggleMic}
            aria-pressed={listening}
          >
            {listening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
            {listening ? "Stop listening" : "Start speaking"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            disabled={!transcript}
            onClick={() => ask(transcript)}
          >
            Send to tutor
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full text-white"
            aria-label="End session"
            onClick={() => {
              recRef.current?.stop();
              setListening(false);
              setTranscript("");
              setReply("");
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}