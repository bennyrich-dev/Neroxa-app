# Nexora App Deployment Guide

This project is a monorepo workspace managed by `pnpm`. The primary web application is located within the `artifacts/nexora` directory and is built using Vite.

## Workspace Architecture

- **Root Directory**: Contains global configuration files (`pnpm-workspace.yaml`, `package.json`, `pnpm-lock.yaml`).
- **App Directory**: `artifacts/nexora` (Contains the frontend codebase, Vite configuration, and dependencies).
- **Shared Libraries**: `lib/db`, `lib/api-zod` (Internal modules consumed by the main application).

## Vercel Deployment Configurations

To ensure the build agent compiles all dependent local workspace packages smoothly, configure your Vercel Project Dashboard with these exact settings:

### 1. General Settings
- **Framework Preset**: `Vite`
- **Root Directory**: `artifacts/nexora`

### 2. Build & Output Settings
- **Build Command**: `cd ../.. && pnpm run build`
- **Output Directory**: Default (`dist` or left toggled OFF)
- **Install Command**: `pnpm install --no-frozen-lockfile --force`

---

## Local Development Commands

To run the full workspace application suite locally, execute the following commands from the project root:

```bash
# Install all workspace dependencies cleanly
pnpm install

# Run the development server for the web app
pnpm --filter nexora dev
