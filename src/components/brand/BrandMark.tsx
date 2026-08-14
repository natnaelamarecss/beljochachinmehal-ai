export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="በልጆቻችን መሃል AI logo">
      <defs>
        <linearGradient id="bm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#078930" />
          <stop offset="55%" stopColor="#FCDD09" />
          <stop offset="100%" stopColor="#DA121A" />
        </linearGradient>
      </defs>
      <path
        d="M6 12c6-3 12-3 18 1 6-4 12-4 18-1v25c-6-3-12-3-18 1-6-4-12-4-18-1V12Z"
        fill="url(#bm-g)"
        opacity="0.9"
      />
      <path d="M24 13v25" stroke="white" strokeWidth="1.6" opacity="0.75" />
      <g fill="white">
        <circle cx="14" cy="20" r="2" />
        <circle cx="34" cy="20" r="2" />
        <circle cx="24" cy="27" r="2.4" />
      </g>
      <g stroke="white" strokeWidth="1.2" opacity="0.8">
        <path d="M14 20 24 27M34 20 24 27" />
      </g>
    </svg>
  );
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark className={compact ? "h-7 w-7" : "h-9 w-9"} />
      <span className="leading-tight">
        <span className="block text-sm font-semibold tracking-tight">በልጆቻችን መሃል AI</span>
        {!compact && (
          <span className="block text-[11px] text-muted-foreground">AI Among Our Children</span>
        )}
      </span>
    </span>
  );
}