import { cn } from "@workspace/ui/lib/utils"

import {
  getRoadmapProgress,
  type RoadmapStep as RoadmapStepData,
} from "@/lib/roadmap"
import { RoadmapStep } from "./roadmap-step"

type RoadmapProps = {
  steps: RoadmapStepData[]
  className?: string
}

/**
 * Horizontal roadmap timeline.
 * Scrolls sideways with an edge fade on small screens and lays out as
 * equal columns once there is room.
 */
export function Roadmap({ steps, className }: RoadmapProps) {
  const { current } = getRoadmapProgress(steps)

  return (
    <section
      aria-labelledby="roadmap-heading"
      className={cn("flex flex-col gap-8", className)}
    >
      <div className="xs:flex-row xs:items-baseline flex flex-col gap-1">
        <h2
          id="roadmap-heading"
          className="text-lg font-medium text-foreground"
        >
          Where things stand:
        </h2>
        {current && (
          <p className="text-sm text-secondary-foreground">
            &nbsp; Working on {current.title.toLowerCase()} now.
          </p>
        )}
      </div>

      <div
        tabIndex={0}
        aria-label="Roadmap steps"
        className="-mx-6 scroll-fade-x overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 sm:-mx-10 sm:px-10 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
      >
        <ol
          className="flex snap-x snap-mandatory md:grid md:snap-none"
          style={{
            gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
          }}
        >
          {steps.map((step, index) => (
            <RoadmapStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
