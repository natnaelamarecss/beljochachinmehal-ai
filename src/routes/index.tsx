import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageSquare,
  Radio,
  ScanText,
  Sparkles,
  FileText,
  ShieldCheck,
  GraduationCap,
  Users,
} from "lucide-react";
import { BrandMark, BrandLockup } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/button";
import { PRODUCT_MODELS } from "@/lib/ai/models";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "በልጆቻችን መሃል AI — Free Ethiopian Learning AI" },
      {
        name: "description",
        content:
          "A free multimodal AI platform for Ethiopian students, parents and teachers: chat, live voice tutoring, Amharic OCR, image and document creation.",
      },
      { property: "og:title", content: "በልጆቻችን መሃል AI — Learn. Create. Explore." },
      {
        property: "og:description",
        content:
          "Free AI for Ethiopian learners: bilingual chat, live tutoring, Amharic image-to-text and educational image creation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: MessageSquare, title: "AI Chat", body: "Ask anything in Amharic or English." },
  { icon: Radio, title: "Live AI", body: "Speak with a patient voice tutor." },
  { icon: ScanText, title: "Image to Text", body: "Amharic & English OCR from any photo." },
  { icon: Sparkles, title: "Image Generation", body: "Clear, accurate educational visuals." },
  { icon: FileText, title: "Documents & PDFs", body: "Study guides, worksheets, notes." },
  { icon: GraduationCap, title: "Personalized Learning", body: "Practice tuned to your level." },
  { icon: Users, title: "Parents & Teachers", body: "Progress summaries and class tools." },
  { icon: ShieldCheck, title: "Child Safety", body: "Age-appropriate answers, always." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="surface-night">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-white sm:px-8">
          <BrandLockup />
          <div className="flex items-center gap-2">
            <Link to="/auth">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign in
              </Button>
            </Link>
            <Link to="/auth">
              <Button>Start Learning</Button>
            </Link>
          </div>
        </nav>

        <div className="mx-auto max-w-4xl px-5 pt-16 pb-24 text-center sm:px-8">
          <BrandMark className="mx-auto h-16 w-16 drop-shadow-[0_10px_30px_rgba(7,137,48,0.5)]" />
          <h1 className="text-brand-gradient animate-brand-sweep mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            በልጆቻችን መሃል AI
          </h1>
          <p className="mt-4 text-lg text-white/85">ተማር። ፍጠር። መርምር።</p>
          <p className="text-sm tracking-[0.28em] text-white/50 uppercase">
            Learn. Create. Explore.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-white/70 sm:text-base">
            A free professional multimodal AI platform designed to help students learn, create,
            research and build with AI — in Amharic and English.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="shadow-glow rounded-full">
                Start Learning
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                Explore AI
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight">Choose your AI</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Three capability modes. All of them free.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PRODUCT_MODELS.map((m) => (
              <div key={m.id} className="rounded-2xl border bg-card p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden>
                    {m.emoji}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    FREE
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.descriptionAm}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary/50 py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="text-center text-2xl font-semibold tracking-tight">One platform</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border bg-card p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Free AI for every Ethiopian learner
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            No subscription. No hidden limits. Just learning.
          </p>
          <Link to="/auth">
            <Button size="lg" className="mt-6 rounded-full">
              Start Learning
            </Button>
          </Link>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        በልጆቻችን መሃል AI · AI Among Our Children · Learn. Create. Explore.
      </footer>
    </div>
  );
}
