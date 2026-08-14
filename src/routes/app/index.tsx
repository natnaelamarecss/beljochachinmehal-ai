import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageSquare,
  Radio,
  Upload,
  ScanText,
  Sparkles,
  FileText,
  FileType2,
  Rocket,
} from "lucide-react";
import { useState } from "react";
import { ModelSelector } from "@/components/ai/ModelSelector";
import { useAuth } from "@/hooks/useAuth";
import { DEFAULT_MODEL, type ProductModelId } from "@/lib/ai/models";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "AI Home — በልጆቻችን መሃል AI" },
      {
        name: "description",
        content: "Your AI workspace: chat, live tutoring, image to text, and creation tools.",
      },
      { property: "og:title", content: "AI Home — በልጆቻችን መሃል AI" },
      { property: "og:description", content: "Learn, create and explore with free Ethiopian AI." },
    ],
  }),
  component: AppHome,
});

const TILES = [
  { to: "/app/chat", icon: MessageSquare, label: "Ask AI", hint: "Chat about anything" },
  { to: "/app/live", icon: Radio, label: "Live", hint: "Talk to your tutor" },
  { to: "/app/ocr", icon: ScanText, label: "Image to Text", hint: "Amharic & English OCR" },
  { to: "/app/images", icon: Sparkles, label: "Generate Image", hint: "Educational visuals" },
  { to: "/app/projects", icon: Rocket, label: "New Project", hint: "One learning workspace" },
  { to: "/app/projects", icon: Upload, label: "Upload", hint: "Files & documents" },
  { to: "/app/projects", icon: FileText, label: "Document", hint: "Notes, essays, guides" },
  { to: "/app/projects", icon: FileType2, label: "PDF", hint: "Study guides & quizzes" },
] as const;

function AppHome() {
  const { displayName } = useAuth();
  const [model, setModel] = useState<ProductModelId>(DEFAULT_MODEL);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ModelSelector value={model} onChange={setModel} />
      </div>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight">
        Hello, {displayName || "friend"} 👋
      </h1>
      <p className="mt-2 text-muted-foreground">What would you like to learn or create today?</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map(({ to, icon: Icon, label, hint }) => (
          <Link
            key={label}
            to={to}
            className="group rounded-2xl border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40"
          >
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{hint}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { title: "Recent chats", empty: "Your conversations will appear here." },
          { title: "Recent files", empty: "Upload a file to get started." },
          { title: "Recommended", empty: "Learn a little and we'll suggest next steps." },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border bg-card p-5">
            <h2 className="text-sm font-semibold">{c.title}</h2>
            <p className="mt-2 text-xs text-muted-foreground">{c.empty}</p>
          </div>
        ))}
      </section>
    </div>
  );
}