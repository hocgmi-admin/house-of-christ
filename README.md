# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/internal
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```

## Deployment

GitHub Actions builds and checks everything. Dokploy only pulls and runs a
finished image from GitHub Container Registry; it never builds.

### Flow

1. Push work to a feature branch. The **CI** workflow
   (`.github/workflows/ci.yml`) runs lint, typecheck, tests, and a Docker
   build check on every push to any branch except `main`.
2. Open a pull request into `release/internal-portal/<version>`. Branch rules
   block the merge until both CI jobs pass.
3. Open a pull request from the release branch into `main`, gated the same
   way.
4. Merging into `main` runs **Deploy internal portal**
   (`.github/workflows/deploy-internal.yml`): it re-runs the checks, pushes
   `ghcr.io/hocgmi-admin/house-of-christ/internal` tagged `latest`, `main`,
   and `sha-<short commit>`, then calls the Dokploy API to redeploy.

### Branch rules

Create a ruleset in the repository settings targeting `main` and
`release/**` with: require a pull request, require status checks
**Lint, typecheck, test** and **Docker image builds**, block force pushes,
and restrict deletions.

### Dokploy

Create an **Application** with the **Docker** provider, image
`ghcr.io/hocgmi-admin/house-of-christ/internal:latest`, container port
`3000`. If the GHCR package is private, add a GHCR registry credential with a
token that has `read:packages`. To roll back, point the application at a
`sha-<short commit>` tag and deploy.

### GitHub `production` environment

| Name | Kind | Value |
| --- | --- | --- |
| `DOKPLOY_URL` | variable | Dokploy's Cloudflare Tunnel hostname, e.g. `https://dokploy.example.org` |
| `DOKPLOY_APPLICATION_ID` | variable | The application's ID in Dokploy |
| `DOKPLOY_API_KEY` | secret | An API key from Dokploy's profile settings |
| `CF_ACCESS_CLIENT_ID` | secret | Cloudflare Access service token ID, if the hostname is behind Access |
| `CF_ACCESS_CLIENT_SECRET` | secret | Cloudflare Access service token secret, if the hostname is behind Access |

Build the image locally from the repository root:

```bash
docker build -f apps/internal/Dockerfile -t internal .
docker run --rm -p 3000:3000 internal
```
