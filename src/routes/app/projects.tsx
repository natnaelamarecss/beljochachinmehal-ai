import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/projects")({
  head: () => ({
    meta: [
      { title: "Projects — በልጆቻችን መሃል AI" },
      {
        name: "description",
        content: "Bring files, chat, live tutoring and creations together in one learning workspace.",
      },
      { property: "og:title", content: "Projects — በልጆቻችን መሃል AI" },
      { property: "og:description", content: "One workspace for every school project." },
    ],
  }),
  component: () => (
    <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">🚀 Projects</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Project workspaces bring files, chat, live tutoring, images, documents and PDFs together.
        File uploads, RAG and document/PDF generation are the next features being wired into this
        workspace.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {["Files & RAG", "Documents & PDFs", "Quizzes & Study Notes"].map((t) => (
          <div key={t} className="rounded-2xl border bg-card p-5">
            <p className="text-sm font-medium">{t}</p>
            <p className="mt-1 text-xs text-muted-foreground">Coming next</p>
          </div>
        ))}
      </div>
    </div>
  ),
});