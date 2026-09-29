import { cn } from "@workspace/ui/lib/utils"

type ArchWindowProps = {
  className?: string
}

/**
 * Decorative arched window with light falling through it.
 * The two mullions form a cross. Purely visual, hidden from assistive tech.
 * Fills the width of its parent; the parent controls sizing.
 */
export function ArchWindow({ className }: ArchWindowProps) {
  return (
    <div
      aria-hidden
      className={cn("relative w-full", className)}
      style={{ aspectRatio: "3 / 5" }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-lg border border-border bg-card shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000">
        <div
          className="absolute inset-0 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-[2000ms]"
          style={{
            background: [
              "radial-gradient(120% 70% at 50% 28%, color-mix(in oklch, var(--primary) 58%, transparent) 0%, color-mix(in oklch, var(--primary) 22%, transparent) 42%, transparent 78%)",
              "linear-gradient(to bottom, transparent 55%, color-mix(in oklch, var(--foreground) 6%, transparent) 100%)",
            ].join(", "),
          }}
        />
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
        <div className="absolute inset-x-0 top-[38%] h-px bg-border" />
        <div className="absolute inset-0 rounded-t-full rounded-b-lg ring-8 ring-card ring-inset" />
      </div>
      <div className="absolute inset-x-[-8%] -bottom-2 h-2 rounded-full bg-border" />
    </div>
  )
}
