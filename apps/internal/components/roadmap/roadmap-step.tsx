import { cn } from "@workspace/ui/lib/utils"

import {
  roadmapStatusLabel,
  type RoadmapStep as RoadmapStepData,
} from "@/lib/roadmap"

type RoadmapStepProps = {
  step: RoadmapStepData
  index: number
  isLast: boolean
}

/**
 * One step on the horizontal roadmap timeline.
 * The marker sits on a rail that runs to the next step.
 */
export function RoadmapStep({ step, index, isLast }: RoadmapStepProps) {
  const isDone = step.status === "done"
  const isCurrent = step.status === "in-progress"

  return (
    <li
      className={cn(
        "relative flex w-60 shrink-0 snap-start flex-col md:w-auto",
        !isLast && "pr-8"
      )}
    >
      <div className="relative flex h-6 items-center">
        <StatusMarker status={step.status} />
        {!isLast && (
          <span
            aria-hidden
            className={cn(
              "absolute top-1/2 right-0 left-8 h-px -translate-y-1/2",
              isDone ? "bg-primary/60" : "bg-border"
            )}
          />
        )}
      </div>

      <h3
        className={cn(
          "mt-5 text-base font-medium",
          isDone || isCurrent ? "text-foreground" : "text-secondary-foreground"
        )}
      >
        <span className="text-muted-foreground tabular-nums">{index + 1}.</span>{" "}
        {step.title}
      </h3>
      <p
        className={cn(
          "mt-0.5 text-sm",
          isCurrent ? "text-primary" : "text-muted-foreground"
        )}
      >
        {roadmapStatusLabel[step.status]}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>
    </li>
  )
}

function StatusMarker({ status }: { status: RoadmapStepData["status"] }) {
  if (status === "done") {
    return (
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <svg
          viewBox="0 0 16 16"
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      </span>
    )
  }

  if (status === "in-progress") {
    return (
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
      >
        <span className="size-2 rounded-full bg-primary motion-safe:animate-pulse" />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className="size-6 shrink-0 rounded-full border border-border bg-background"
    />
  )
}
