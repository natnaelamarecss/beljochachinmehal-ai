import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ModelSelector } from "@/components/ai/ModelSelector";
import { apiPost } from "@/lib/api/client";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_MODEL, type ProductModelId } from "@/lib/ai/models";

export const Route = createFileRoute("/app/images")({
  head: () => ({
    meta: [
      { title: "Create Image — በልጆቻችን መሃል AI" },
      {
        name: "description",
        content: "Generate clear educational diagrams, illustrations and posters with free AI.",
      },
      { property: "og:title", content: "Create Image — በልጆቻችን መሃል AI" },
      { property: "og:description", content: "Educational AI image generation for classrooms." },
    ],
  }),
  component: ImagesPage,
});

const STYLES = [
  "Photorealistic",
  "3D",
  "Cinematic",
  "Illustration",
  "Cartoon",
  "Watercolor",
  "Digital Art",
  "Educational",
  "Infographic",
  "Scientific",
  "Children's Book",
  "Isometric",
  "Minimal",
];
const RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4"];

type SavedImage = { id: string; prompt: string; image_url: string };

function ImagesPage() {
  const [model, setModel] = useState<ProductModelId>("student_pro" as ProductModelId);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Educational");
  const [ratio, setRatio] = useState("1:1");
  const [educational, setEducational] = useState(true);
  const [busy, setBusy] = useState(false);
  const [gallery, setGallery] = useState<SavedImage[]>([]);

  useEffect(() => {
    supabase
      .from("generated_images")
      .select("id, prompt, image_url")
      .order("created_at", { ascending: false })
      .limit(12)
      .then(({ data }) => setGallery((data as SavedImage[]) ?? []));
  }, []);

  async function generate() {
    if (prompt.trim().length < 3) {
      toast.error("Describe the image you want.");
      return;
    }
    setBusy(true);
    try {
      const res = await apiPost<{ image: string }>("/api/v1/images/generate", {
        prompt,
        model,
        style,
        aspectRatio: ratio,
        educational,
      });
      const { data: userData } = await supabase.auth.getUser();
      const { data: saved } = await supabase
        .from("generated_images")
        .insert({
          user_id: userData.user!.id,
          prompt,
          style,
          aspect_ratio: ratio,
          image_url: res.image,
        })
        .select("id, prompt, image_url")
        .single();
      setGallery((g) => [(saved as SavedImage) ?? { id: "temp", prompt, image_url: res.image }, ...g]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">🎨 Create Image</h1>
        <ModelSelector value={model} onChange={setModel} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4 rounded-2xl border bg-card p-5">
          <div className="space-y-1.5">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A labelled diagram of the water cycle for grade 6"
              className="min-h-28"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Style</Label>
            <div className="flex flex-wrap gap-1.5">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`rounded-full border px-2.5 py-1 text-xs ${
                    style === s ? "border-primary text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Aspect ratio</Label>
            <div className="flex flex-wrap gap-1.5">
              {RATIOS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRatio(r)}
                  className={`rounded-full border px-2.5 py-1 text-xs ${
                    ratio === r ? "border-primary text-primary" : "text-muted-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-3">
            <Label htmlFor="edu" className="text-sm">
              Educational Mode
            </Label>
            <Switch id="edu" checked={educational} onCheckedChange={setEducational} />
          </div>

          <Button className="w-full" onClick={generate} disabled={busy}>
            {busy ? "Creating…" : "Generate Image"}
          </Button>
        </div>

        <div>
          <h2 className="text-sm font-semibold">My Images</h2>
          {gallery.length === 0 ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Your generated images will be saved here.
            </p>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {gallery.map((img) => (
                <figure key={img.id} className="overflow-hidden rounded-xl border bg-card">
                  <img src={img.image_url} alt={img.prompt} loading="lazy" className="w-full" />
                  <figcaption className="line-clamp-2 p-2 text-[11px] text-muted-foreground">
                    {img.prompt}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}