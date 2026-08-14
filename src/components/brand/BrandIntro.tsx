import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";

const SEEN_KEY = "belijochachin.intro.seen";

export function BrandIntro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setLeaving(true), reduced ? 300 : 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => {
      window.sessionStorage.setItem(SEEN_KEY, "1");
      onDone();
    }, 600);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  const skip = () => {
    window.sessionStorage.setItem(SEEN_KEY, "1");
    onDone();
  };

  return (
    <div
      className={`surface-night fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/50 animate-pulse"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 8) * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <BrandMark className="h-16 w-16 drop-shadow-[0_10px_30px_rgba(7,137,48,0.55)]" />
        <h1 className="text-brand-gradient animate-brand-sweep text-4xl font-bold tracking-tight sm:text-5xl">
          በልጆቻችን መሃል AI
        </h1>
        <p className="text-sm text-white/80 sm:text-base">ለልጆቻችን የተሻለ የመማሪያ ዓለም</p>
        <p className="text-xs tracking-[0.3em] text-white/50 uppercase">Learn. Create. Explore.</p>
      </div>

      <button
        onClick={skip}
        className="absolute bottom-8 rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/70 transition hover:bg-white/10"
      >
        Skip
      </button>
    </div>
  );
}

export function hasSeenIntro() {
  if (typeof window === "undefined") return true;
  return window.sessionStorage.getItem(SEEN_KEY) === "1";
}