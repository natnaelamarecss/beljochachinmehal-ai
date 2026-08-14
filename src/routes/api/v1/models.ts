import { createFileRoute } from "@tanstack/react-router";
import { PRODUCT_MODELS } from "@/lib/ai/models";

export const Route = createFileRoute("/api/v1/models")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          JSON.stringify({
            data: PRODUCT_MODELS.map(({ id, emoji, name, description, capabilities }) => ({
              id,
              emoji,
              name,
              description,
              capabilities,
              price: "free",
            })),
          }),
          { headers: { "Content-Type": "application/json" } },
        ),
    },
  },
});