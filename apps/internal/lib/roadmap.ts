export type RoadmapStatus = "done" | "in-progress" | "planned"

export type RoadmapStep = {
  id: string
  title: string
  description: string
  status: RoadmapStatus
}

/**
 * The project roadmap shown on the root page.
 * Steps are in order. Update a step's `status` as work moves along.
 */
export const roadmap: RoadmapStep[] = [
  {
    id: "internal-portal",
    title: "Internal portal",
    description:
      "A private space for the team to manage everything that appears on the website.",
    status: "in-progress",
  },
  {
    id: "public-website",
    title: "Public website",
    description:
      "A coming soon page to start, growing into the church's home online.",
    status: "planned",
  },
  {
    id: "services-management",
    title: "Sunday management",
    description:
      "Plan and publish Sunday services, with times, locations, and who is serving.",
    status: "planned",
  },
  {
    id: "events-management",
    title: "Events management",
    description:
      "Create and manage church events, from announcements to attendance.",
    status: "planned",
  },
  {
    id: "coming-features",
    title: "Coming features",
    description:
      "Further additions and improvements, announced here as they're planned.",
    status: "planned",
  },
]

export const roadmapStatusLabel: Record<RoadmapStatus, string> = {
  done: "Done",
  "in-progress": "In progress",
  planned: "Planned",
}

export function getRoadmapProgress(steps: RoadmapStep[]) {
  const done = steps.filter((step) => step.status === "done").length
  const current = steps.find((step) => step.status === "in-progress")
  return { done, total: steps.length, current }
}
