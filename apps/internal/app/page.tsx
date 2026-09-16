import { ArchWindow } from "@/components/arch-window"
import { Roadmap } from "@/components/roadmap/roadmap"
import { roadmap } from "@/lib/roadmap"

export default function Page() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 py-8 sm:px-10 sm:py-10">
      <header className="flex items-baseline justify-between gap-6">
        <p className="font-(family-name:--font-display) text-xl leading-none tracking-tight text-foreground">
          House of Christ
        </p>
        <p className="text-sm text-muted-foreground">Internal portal</p>
      </header>

      <div className="flex flex-1 flex-col justify-center gap-16 py-14 md:gap-20 md:py-16">
        <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-20">
          <div className="max-w-md">
            <h1 className="font-(family-name:--font-display) text-6xl leading-[0.95] font-normal tracking-tight text-foreground sm:text-7xl">
              Coming soon.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-secondary-foreground">
              We&apos;re building one place for the House of Christ team to
              care for members, ministries, giving, and events. It isn&apos;t
              open yet, but you can follow along here.
            </p>
          </div>

          <ArchWindow className="order-first mx-auto w-[min(55vw,200px)] md:order-none md:mx-0 md:w-[clamp(200px,19vw,240px)]" />
        </section>

        <Roadmap steps={roadmap} className="border-t border-border pt-10" />
      </div>

      <footer className="flex flex-col justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>Need access when it opens? Ask your church administrator.</p>
        <p>&copy; {new Date().getFullYear()} House of Christ</p>
      </footer>
    </main>
  )
}
