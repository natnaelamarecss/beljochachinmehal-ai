import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { jsonError, requireUser } from "@/lib/api/auth.server";

const Body = z.object({
  image: z.string().min(20),
  language: z.enum(["auto", "am", "en"]).default("auto"),
  mode: z.enum(["extract", "explain"]).default("extract"),
});

export const Route = createFileRoute("/api/v1/ocr")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = await requireUser(request);
        if ("error" in auth) return auth.error;

        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return jsonError(400, "invalid_request", "Please upload a valid image.");
        }
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return jsonError(500, "not_configured", "AI is not available right now.");

        const langHint =
          parsed.data.language === "am"
            ? "The text is in Amharic (Ge'ez script)."
            : parsed.data.language === "en"
              ? "The text is in English."
              : "The text may be Amharic, English or both.";

        const instruction =
          parsed.data.mode === "explain"
            ? `Look at this image and explain it clearly for a student. ${langHint} If it contains text, transcribe the important parts first, then explain.`
            : `Extract ALL text from this image exactly, preserving headings, paragraphs, lists, tables and numbers as Markdown. ${langHint} Return only the extracted text, no commentary. If nothing is readable, say exactly: NO_TEXT_FOUND`;

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: instruction },
                  { type: "image_url", image_url: { url: parsed.data.image } },
                ],
              },
            ],
          }),
        });

        if (!res.ok) {
          return jsonError(
            502,
            "ocr_failed",
            "I couldn't confidently read this image. Try a clearer photo.",
          );
        }
        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = data.choices?.[0]?.message?.content ?? "";
        return new Response(JSON.stringify({ data: { text } }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});