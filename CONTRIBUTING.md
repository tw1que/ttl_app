# Contributing

## Setup
1. Node 20.
2. `npm i`
3. Server dev: `npm run -w ttl_server dev`

## Werkafspraken
- Kleine commits. Imperatieve messages.
- Test eerst lokaal: `npm run coverage`.
- Geen `any`. Gebruik `unknown` of echte types.
- Publieke API's testen: happy + één failure-pad.

## Commit conventies
- `feat(server): ...`
- `fix(server): ...`
- `chore(ci): ...`
- `docs: ...`

## Code stijl
- ESLint + Prettier default.
- Max 200 regels per file als richtlijn.
- Lagen: `routes/`, `controllers/`, `services/`, `lib/`.

## Coverage drempels
- Server: lines 80, funcs 80, branches 70, statements 80.
- Build faalt onder drempel.
