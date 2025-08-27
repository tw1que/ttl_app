# CODEX_TASK.md — ttl_app harden & TS-migratie (server)

## Doel
- TS-migratie voor ttl_server
- Linting/Prettier in monorepo
- Vitest + coverage drempels
- CI workflow
- Basis health route + voorbeeldvalidatie

## Branch
chore/ts-ci-tests

## Stappen voor Codex
1. Maak branch `chore/ts-ci-tests` vanaf `main`.
2. Pas onderstaande patches toe in volgorde en commit per patch:
   - 0001-root-tooling.patch -> `chore(root): tooling, eslint, prettier, ci`
   - 0002-server-ts.patch -> `feat(server): migrate to TypeScript + zod`
   - 0003-tests-coverage.patch -> `test(server): vitest + coverage thresholds`
   - 0004-contributing.patch -> `docs: CONTRIBUTING`
3. Run lokaal: `npm i && npm run coverage` en fix issues tot green.
4. Push branch en open PR met titel: `chore(ts+ci): TS-server, lint, tests, coverage`.

## Acceptatiecriteria
- `npm run lint`, `npm run build`, `npm run coverage` slagen lokaal en in CI.
- Endpoint `GET /health` geeft `{"ok": true}` met 200.
- Coverage ≥ 80 lines/functions, 70 branches, 80 statements in ttl_server.
- Geen `any` in nieuwe code.
