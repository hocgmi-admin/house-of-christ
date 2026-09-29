import path from "node:path"
import { fileURLToPath } from "node:url"
import type { NextConfig } from "next"

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..")

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  // Produce a self-contained server in .next/standalone for the Docker image.
  output: "standalone",
  // Trace files from the monorepo root so workspace packages are included.
  outputFileTracingRoot: monorepoRoot,
}

export default nextConfig
