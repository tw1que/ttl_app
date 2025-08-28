FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
COPY ttl_client/package.json ttl_client/package.json
COPY ttl_server/package.json ttl_server/package.json
RUN npm ci --workspaces --include-workspace-root
COPY . .
CMD ["node"]
