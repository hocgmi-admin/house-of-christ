# syntax=docker/dockerfile:1
# Build from the repository root:
#   docker build -f apps/internal/Dockerfile -t internal .

ARG NODE_VERSION=22
ARG PNPM_VERSION=10.33.4

# ---------------------------------------------------------------------------
# Base: Node with pnpm and turbo available
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION
RUN apk add --no-cache libc6-compat \
  && npm install -g pnpm@${PNPM_VERSION} turbo@2 \
  && pnpm config set store-dir /pnpm/store
WORKDIR /app

# ---------------------------------------------------------------------------
# Pruner: keep only the workspace packages the internal app depends on
# ---------------------------------------------------------------------------
FROM base AS pruner
COPY . .
RUN turbo prune internal --docker

# ---------------------------------------------------------------------------
# Builder: install pruned dependencies, then build
# ---------------------------------------------------------------------------
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1

# Install with only the manifests first so this layer caches well.
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN pnpm turbo run build --filter=internal

# ---------------------------------------------------------------------------
# Runner: minimal image with the standalone server
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/internal/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/internal/.next/static ./apps/internal/.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "apps/internal/server.js"]
