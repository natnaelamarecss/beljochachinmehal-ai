import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { jsonError, requireUser } from "@/lib/api/auth.server";
import { buildSystemPrompt, resolveModel, safetyPreCheck } from "@/lib/ai/router.server";

const Body = z.object({
  model: z.string().optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(24000),
      }),
    )
    .min(1)
    .max(60),
  context: z.string().max(20000).optional(),
});

export const Route = createFileRoute("/api/v1/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = await requireUser(request);
        if ("error" in auth) return auth.error;

        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return jsonError(400, "invalid_request", "That request could not be understood.");
        }
        const { model, messages, context } = parsed.data;

        const last = messages[messages.length - 1]!;
        const check = safetyPreCheck(last.content);
        if (!check.ok) {
          return new Response(check.reason, {
            status: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return jsonError(500, "not_configured", "AI is not available right now.");

        const route = resolveModel(model);
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: route.provider,
            stream: true,
            messages: [
              {
                role: "system",
                content: buildSystemPrompt(
                  model,
                  context ? `Use this material from the user's files as context:\n${context}` : "",
                ),
              },
              ...messages,
            ],
          }),
        });

        if (upstream.status === 429) {
          return jsonError(429, "rate_limited", "Too many requests right now. Please try again shortly.");
        }
        if (upstream.status === 402) {
          return jsonError(402, "credits_exhausted", "AI credits are exhausted. Please try again later.");
        }
        if (!upstream.ok || !upstream.body) {
          return jsonError(502, "upstream_error", "Something went wrong. Please try again.");
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});