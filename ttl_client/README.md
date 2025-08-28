# ttl_client – Next.js + shadcn/ui

This package contains the Next.js client using the App Router and Tailwind CSS with shadcn-style components.

## Commands

- dev: `npm run -w ttl_client dev` (runs on http://localhost:5173)
- build: `npm run -w ttl_client build`
- start (prod): `npm run -w ttl_client start` (after build)

## Healthcheck

`/api/health` responds with `{ status: "ok" }` for Docker health checks.

