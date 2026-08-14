import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — በልጆቻችን መሃል AI" },
      { name: "description", content: "Manage your profile, language and learning preferences." },
      { property: "og:title", content: "Settings — በልጆቻችን መሃል AI" },
      { property: "og:description", content: "Your account, language and preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState("en");
  const [role, setRole] = useState<string>("student");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, grade, language")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setFullName(data.full_name ?? "");
        setGrade(data.grade ?? "");
        setLanguage(data.language ?? "en");
      });
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => data?.role && setRole(data.role));
  }, [user]);

  async function save() {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name: fullName, grade, language, onboarded: true });
    toast[error ? "error" : "success"](
      error ? "Could not save your profile." : "Profile saved.",
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Signed in as {user?.email} · role: {role}
      </p>

      <div className="mt-6 space-y-4 rounded-2xl border bg-card p-5">
        <div className="space-y-1.5">
          <Label htmlFor="fullname">Full name</Label>
          <Input id="fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="grade">Grade</Label>
          <Input
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="e.g. Grade 10"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Language</Label>
          <div className="flex gap-2">
            {[
              { id: "am", label: "አማርኛ" },
              { id: "en", label: "English" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setLanguage(l.id)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  language === l.id ? "border-primary text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <Button onClick={save}>Save changes</Button>
      </div>

      <div className="mt-6 rounded-2xl border bg-card p-5">
        <h2 className="text-sm font-semibold">Safety & privacy</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Every AI response passes a child-safety layer. We only collect what is needed for
          learning, and your conversations stay private to your account.
        </p>
      </div>
    </div>
  );
}