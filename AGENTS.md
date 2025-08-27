# AGENTS.md

## Doel en scope
Breng deze monorepo stapsgewijs naar **volledig TypeScript** met strikte kwaliteit, tests en CI. Minimaliseer diff per PR.

- `ttl_server`: Node + TypeScript.
- `ttl_client`: TypeScript. (Bundler alleen toevoegen als een taak dit vereist.)
- `ttl_db`: later; kies pas tooling in een aparte PR.

## Omgeving
- Node 20 LTS.
- OS-onafhankelijk; scripts draaien op Linux/macOS/Windows.
- Geen secrets in de repo. Gebruik `.env` lokaal. Commit nooit `.env*`. Lever wel `.env.example`.

## Installeren
```bash
npm i
```

## Root scripts (voeg toe als ze ontbreken)
```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier . --write",
    "build": "tsc -b",
    "test": "vitest run",
    "test:watch": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

## Server scripts (voeg toe als ze ontbreken)
In `ttl_server/package.json`:
```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "test": "vitest run"
  }
}
```

## Conventies
- **TypeScript strict.** Geen `any`. Gebruik echte types of `unknown` + runtime-validatie (bijv. zod).
- Module-resolutie: `NodeNext`. ES Modules.
- ESLint + Prettier. Los lint-fouten op, niet negeren.
- Bestandsgrootte richtlijn: ~200 regels per file.
- Laagjes in server: `routes/` → `controllers/` → `services/` → `repositories/` → `lib/`.
- Geen DB-calls direct vanuit controllers/services zonder repository-interface.

## Testing
- Runner: **Vitest v2**.
- Server: environment `node`. Client: environment `jsdom` (alleen indien nodig).
- Coverage drempels (CI faalt eronder):
  - Lines **80%**, Functions **80%**, Branches **70%**, Statements **80%**.
- Test publiek gedrag. Per route/service: happy pad + minimaal één failure pad.
- Elke bugfix krijgt een regressietest.

## CI
- Workflow draait: `npm run lint`, `npm run build`, `npm run coverage`.
- Alleen groene builds mogen mergen.

## Git-regels
- Kleine, logische commits. Conventional commits:
  - `feat(server): ...`, `feat(client): ...`
  - `fix(...)`, `refactor(...)`, `chore(...)`, `test(...)`, `docs(...)`, `ci(...)`, `build(...)`
- Branch per PR. Voorbeelden: `chore/ts-ci-tests`, `feat/server-architecture`, `feat/client-ts`.
- PR-beschrijving: doel, aanpak, checklist (onderstaand), breaking changes indien van toepassing.

## PR-checklist (door agent uit te voeren)
- [ ] `npm run lint` is groen.
- [ ] `npm run build` is groen.
- [ ] `npm run coverage` haalt drempels.
- [ ] Geen `any` in nieuwe/gewijzigde TS-bestanden.
- [ ] Geen secrets toegevoegd. `.env.example` geüpdatet indien nodig.
- [ ] Map- en laag-structuur gevolgd.
- [ ] Tests dekken nieuw publiek gedrag.

## Migratievolgorde (aanwijzing voor agents)
1. **Bootstrap**: root tooling, CI, Vitest, TS-configs, health endpoint. (Server eerst.)
2. **Architectuur**: splits controllers/services/repositories, centrale error-handler, zod-validatie.
3. **Repositories**: definieer interfaces; maak in-memory implementatie; services praten via interfaces.
4. **DB** (aparte PR): kies Prisma of Knex, migraties, `.env.example`, integratietests met SQLite/pg.
5. **Client naar TS**: zet `allowJs:true`, migreer files geleidelijk naar `.ts/.tsx`, daarna `allowJs:false`. Voeg bundler (Vite) alleen toe als vereist.

## Wat agents **niet** doen zonder expliciete opdracht
- Geen nieuwe externe services of cloud resources.
- Geen framework-wissels.
- Geen grootschalige hernoemingen zonder nut.
- Geen vermindering van testdekking.

## Snelle lokale commando’s
```bash
# ontwikkelen server
npm run -w ttl_server dev

# kwaliteitscheck
npm run lint && npm run build && npm run coverage
```
