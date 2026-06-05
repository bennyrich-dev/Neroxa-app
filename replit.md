# Nexora

A cinematic streaming platform with a Netflix/HBO Max-style dark UI, full catalog browsing, search, and watchlist features.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Next.js 15 App Router, Tailwind CSS v4, React Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec → `lib/api-client-react`)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/nexora/src/app/` — Next.js App Router pages (home, browse, search, watchlist, watch/[id])
- `artifacts/nexora/src/components/` — Navbar, ContentCard, ContentRow, HeroSection
- `artifacts/api-server/src/routes/content.ts` — all content/genre/search/watchlist routes
- `lib/api-spec/openapi.yaml` — source of truth for API contract
- `lib/api-client-react/src/generated/` — generated hooks and Zod schemas (do not edit)
- `lib/db/src/schema/index.ts` — Drizzle ORM schema (content, genres, watchlist tables)

## Architecture decisions

- Contract-first API: OpenAPI spec drives code generation for both client hooks and Zod validation schemas
- Next.js App Router with client components for data-fetching pages; root layout is a server component wrapping a `<Providers>` client component for React Query
- Shared proxy routes all traffic: frontend at `/`, API at `/api` — no Vite proxy config needed
- Images served from Unsplash with `unoptimized: true` in next.config.ts to avoid domain allow-listing

## Product

Users can browse a catalog of movies, series, and documentaries. The home page features a cinematic hero section with featured content and horizontal-scrolling rows for trending and new releases. Browse supports filtering by type and genre. Search finds content by title or description. A personal watchlist lets users save content for later. Each title has a dedicated watch page with cast, rating, and recommendations.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `cast` is a reserved keyword in PostgreSQL. Always quote it as `"cast"` in raw SQL INSERT statements. The Drizzle schema handles this automatically, but the seed script must quote it manually.
- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec change before editing frontend components.
- Do not run `pnpm dev` at the workspace root — use workflow restarts instead.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- .
