import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  MessageSquare,
  Radio,
  FolderOpen,
  Sparkles,
  ScanText,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import { BrandLockup } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { to: "/app", label: "Home", icon: Home },
  { to: "/app/chat", label: "AI Chat", icon: MessageSquare },
  { to: "/app/live", label: "Live", icon: Radio },
  { to: "/app/ocr", label: "Image to Text", icon: ScanText },
  { to: "/app/images", label: "Create Image", icon: Sparkles },
  { to: "/app/projects", label: "Projects", icon: FolderOpen },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

const MOBILE = [
  { to: "/app", label: "Home", icon: Home },
  { to: "/app/chat", label: "AI", icon: MessageSquare },
  { to: "/app/live", label: "Live", icon: Radio },
  { to: "/app/images", label: "Create", icon: Sparkles },
  { to: "/app/settings", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r bg-card/60 px-3 py-4 md:flex">
        <Link to="/app" className="px-2 py-1">
          <BrandLockup />
        </Link>
        <nav className="mt-6 flex flex-1 flex-col gap-1" aria-label="Main">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <Button
          variant="ghost"
          className="justify-start gap-3 text-muted-foreground"
          onClick={() => supabase.auth.signOut()}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </aside>

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-card/95 backdrop-blur md:hidden"
        aria-label="Mobile"
      >
        {MOBILE.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] ${
              pathname === to ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}