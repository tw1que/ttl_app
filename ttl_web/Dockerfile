FROM node:20-bookworm AS deps
WORKDIR /repo
# kopieer root manifests
COPY package.json package-lock.json ./
# kopieer workspace manifests (geen source nog)
COPY ttl_web/package.json ttl_web/package.json
COPY ttl_client/package.json ttl_client/package.json || true
COPY ttl_server/package.json ttl_server/package.json || true
COPY ttl_db/package.json ttl_db/package.json || true
RUN npm ci --workspaces --include-workspace-root

FROM node:20-bookworm AS app
WORKDIR /repo
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/package.json ./package.json
COPY --from=deps /repo/package-lock.json ./package-lock.json
# kopieer nu de hele repo (broncode)
COPY . .
WORKDIR /repo/ttl_web
EXPOSE 3000
CMD ["npm","run","dev"]
