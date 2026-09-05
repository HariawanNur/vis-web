# ------------------------------------------------------------------------------
# Base image
# ------------------------------------------------------------------------------
FROM node:24-bookworm-slim AS base

RUN corepack enable && corepack prepare pnpm@11.18.0 --activate

ENV NPM_CONFIG_FETCH_TIMEOUT=600000
ENV NPM_CONFIG_FETCH_RETRIES=5
ENV NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000
ENV NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000
ENV CI=true

WORKDIR /home/node/app

# ------------------------------------------------------------------------------
# Dependencies layer (best cache)
# ------------------------------------------------------------------------------
FROM base AS prod-deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web-revamp/package.json apps/web-revamp/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile --filter @construction/web-revamp...

# ------------------------------------------------------------------------------
# Production build
# ------------------------------------------------------------------------------
FROM prod-deps AS prod-builder

COPY . .
RUN pnpm --filter @construction/web-revamp build

# ------------------------------------------------------------------------------
# Build layer
# ------------------------------------------------------------------------------
FROM prod-deps AS development

ENV NODE_ENV=development
ENV PORT=3000
ENV VAULT_BOOTSTRAP=true
ENV VAULT_TOKEN_FILE=/home/node/app/vault/data/vault-init.json
ENV ENV_FILE_PATH=.env.local

WORKDIR /home/node/app/apps/web-revamp

EXPOSE 3000
CMD ["sh", "-c", "node /home/node/app/scripts/vault.mjs && pnpm dev --hostname 0.0.0.0"]

# ------------------------------------------------------------------------------
# Production image
# ------------------------------------------------------------------------------
FROM prod-builder AS production

WORKDIR /home/node/app/apps/web-revamp

ENV NODE_ENV=production
ENV PORT=3000
ENV VAULT_NAMESPACE=web
ENV VAULT_TOKEN_FILE=/home/node/app/vault/data/vault-init.json
ENV VAULT_BOOTSTRAP=true
ENV ENV_FILE_PATH=.env.local

EXPOSE 3000
CMD ["sh", "-c", "node /home/node/app/scripts/vault.mjs && node scripts/runtime.mjs"]
