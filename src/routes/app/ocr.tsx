import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiPost } from "@/lib/api/client";

export const Route = createFileRoute("/app/ocr")({
  head: () => ({
    meta: [
      { title: "Image to Text — በልጆቻችን መሃል AI" },
      {
        name: "description",
        content:
          "Turn photos of textbook pages, handwriting and whiteboards into editable Amharic or English text.",
      },
      { property: "og:title", content: "Image to Text — በልጆቻችን መሃል AI" },
      { property: "og:description", content: "Amharic and English OCR built for students." },
    ],
  }),
  component: OcrPage,
});

function OcrPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [language, setLanguage] = useState<"auto" | "am" | "en">("auto");

  function onFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function run(mode: "extract" | "explain") {
    if (!preview) {
      toast.error("Please choose an image first.");
      return;
    }
    setBusy(true);
    try {
      const res = await apiPost<{ text: string }>("/api/v1/ocr", {
        image: preview,
        language,
        mode,
      });
      setText(res.text === "NO_TEXT_FOUND" ? "" : res.text);
      if (res.text === "NO_TEXT_FOUND") {
        toast.error("I couldn't confidently read this image. Try a clearer photo.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">📷 Image to Text</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Amharic, English or both — from textbook pages, notes and whiteboards.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5">
          <label
            htmlFor="ocr-file"
            className="flex h-56 cursor-pointer items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground hover:border-primary/50"
          >
            {preview ? (
              <img src={preview} alt="Selected upload" className="h-full rounded-lg object-contain" />
            ) : (
              "Click to choose an image (JPG, PNG, WEBP)"
            )}
          </label>
          <input
            id="ocr-file"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0])}
          />

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(["auto", "am", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  language === l ? "border-primary text-primary" : "text-muted-foreground"
                }`}
              >
                {l === "auto" ? "Auto" : l === "am" ? "አማርኛ" : "English"}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              <Button size="sm" onClick={() => run("extract")} disabled={busy}>
                Extract text
              </Button>
              <Button size="sm" variant="outline" onClick={() => run("explain")} disabled={busy}>
                Explain
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Extracted text"
            placeholder={busy ? "Reading your image…" : "Extracted text appears here and is editable."}
            className="min-h-64"
          />
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={!text}
              onClick={() => {
                navigator.clipboard.writeText(text);
                toast.success("Copied");
              }}
            >
              Copy
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={!text}
              onClick={() => {
                const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "extracted-text.txt";
                a.click();
                URL.revokeObjectURL(a.href);
              }}
            >
              Download TXT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}