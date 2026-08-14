import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { jsonError, requireUser } from "@/lib/api/auth.server";
import { resolveModel } from "@/lib/ai/router.server";

const Body = z.object({
  prompt: z.string().min(3).max(2000),
  model: z.string().optional(),
  style: z.string().max(60).optional(),
  aspectRatio: z.string().max(10).optional(),
  educational: z.boolean().optional(),
});

export const Route = createFileRoute("/api/v1/images/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = await requireUser(request);
        if ("error" in auth) return auth.error;

        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return jsonError(400, "invalid_request", "Please describe the image you want.");
        }
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return jsonError(500, "not_configured", "AI is not available right now.");

        const { prompt, style, aspectRatio, educational } = parsed.data;
        const enhanced = [
          prompt,
          style ? `Style: ${style}.` : "",
          aspectRatio ? `Aspect ratio: ${aspectRatio}.` : "",
          educational
            ? "Educational diagram: accurate, clearly labelled, readable text, uncluttered layout, age appropriate for school students."
            : "",
          "High quality, clear composition, balanced lighting. Safe for children.",
        ]
          .filter(Boolean)
          .join(" ");

        const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: resolveModel(parsed.data.model).imageProvider,
            messages: [{ role: "user", content: enhanced }],
            modalities: ["image", "text"],
          }),
        });

        if (!res.ok) {
          return jsonError(502, "image_failed", "The image could not be created. Please try again.");
        }
        const data = (await res.json()) as {
          choices?: { message?: { images?: { image_url?: { url?: string } }[] } }[];
        };
        const url = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        if (!url) {
          return jsonError(502, "image_failed", "The image could not be created. Please try again.");
        }
        return new Response(JSON.stringify({ data: { image: url, prompt: enhanced } }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});