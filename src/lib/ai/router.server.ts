import type { ProductModelId } from "./models";

/**
 * Model router: maps product model names to internal provider configuration.
 * Provider ids never leave the server.
 */
type RouterConfig = {
  provider: string;
  systemStyle: string;
  imageProvider: string;
};

const ROUTES: Record<ProductModelId, RouterConfig> = {
  student_lite: {
    provider: "google/gemini-3.6-flash",
    systemStyle:
      "Answer quickly, warmly and concisely with simple language suited to a younger learner. Prefer short paragraphs, examples and one clear takeaway.",
    imageProvider: "google/gemini-3.1-flash-lite-image",
  },
  student_thinker: {
    provider: "google/gemini-3.6-flash",
    systemStyle:
      "Be analytical, patient and Socratic. Break problems into numbered steps, check understanding, give a hint before the full solution, and encourage independent reasoning.",
    imageProvider: "google/gemini-3.1-flash-image",
  },
  student_pro: {
    provider: "google/gemini-3.1-pro-preview",
    systemStyle:
      "Be a professional multimodal study partner. Produce structured, well-organised output (headings, tables, code blocks, study guides) and support research, projects and document creation.",
    imageProvider: "google/gemini-3-pro-image",
  },
};

const SAFETY_PROMPT = `You are "በልጆቻችን መሃል AI" (AI Among Our Children), a free Ethiopian educational AI for students, parents and teachers.
Core rules:
- Education first. You are a tutor, not an answer machine: explain the concept, give a hint, invite an attempt, then give the full solution when asked.
- Child safety first. Never encourage secrecy, self-harm, dangerous behaviour or any sexual content involving minors. Never ask for passwords or unnecessary personal data. If a situation seems unsafe, gently encourage talking to a trusted adult or a professional.
- Stay age appropriate, kind and encouraging.
- Answer in the language the user writes in. Fully support አማርኛ and English, including mixed usage.
- Use Markdown: headings, lists, tables, code blocks and LaTeX-style math when helpful.`;

export function resolveModel(id: string | undefined | null) {
  const key = (id ?? "student_lite") as ProductModelId;
  return ROUTES[key] ?? ROUTES.student_lite;
}

export function buildSystemPrompt(id: string | undefined | null, extra?: string) {
  const route = resolveModel(id);
  return [SAFETY_PROMPT, route.systemStyle, extra].filter(Boolean).join("\n\n");
}

/** Blocks obviously unsafe requests before they reach a provider. */
const BLOCKED = [
  /\bhow to (make|build).{0,20}(bomb|explosive|weapon)\b/i,
  /\b(kill|hurt) myself\b/i,
  /\bchild (porn|sexual)\b/i,
];

export function safetyPreCheck(text: string): { ok: boolean; reason?: string } {
  for (const rx of BLOCKED) {
    if (rx.test(text)) {
      return {
        ok: false,
        reason:
          "I can't help with that. If you are feeling unsafe or worried, please talk to a parent, teacher or another trusted adult.",
      };
    }
  }
  return { ok: true };
}