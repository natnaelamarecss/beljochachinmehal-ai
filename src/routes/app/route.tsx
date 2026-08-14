import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { BrandIntro, hasSeenIntro } from "@/components/brand/BrandIntro";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (session && !hasSeenIntro()) setShowIntro(true);
  }, [session]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <>
      {showIntro && <BrandIntro onDone={() => setShowIntro(false)} />}
      <AppShell>
        <Outlet />
      </AppShell>
    </>
  );
}