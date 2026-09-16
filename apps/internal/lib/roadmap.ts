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
    id: "branding",
    title: "Branding",
    description:
      "A name, mark, colors, and type that feel like House of Christ.",
    status: "in-progress",
  },
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
  const inProgress = steps.filter((step) => step.status === "in-progress")
  return { done, total: steps.length, inProgress }
}

/** Joins step titles into a sentence fragment: "a", "a and b", "a, b, and c". */
export function listStepTitles(steps: RoadmapStep[]) {
  const titles = steps.map((step) => step.title.toLowerCase())
  if (titles.length <= 1) return titles.join("")
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`
  return `${titles.slice(0, -1).join(", ")}, and ${titles[titles.length - 1]}`
}
