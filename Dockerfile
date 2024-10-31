FROM node:20.14-bookworm-slim AS app-build
WORKDIR /tmp/app

COPY --chown=node:node package.json package.json
COPY --chown=node:node tsconfig.json ./tsconfig.json
COPY --chown=node:node yarn.lock yarn.lock
COPY --chown=node:node src/ ./src/

RUN --mount=type=secret,id=NPM_TOKEN,target=/root/.npmrc \
  yarn config set cache-folder /home/node/.cache/yarn \
  && yarn install --frozen-lockfile \
  && yarn build

FROM node:20.14-bookworm-slim AS prod-deps
USER node
WORKDIR /tmp/app

COPY --chown=node:node package.json package.json
COPY --chown=node:node yarn.lock yarn.lock
COPY --chown=node:node --from=app-build /home/node/.cache/yarn /home/node/.cache/yarn

RUN yarn install --production --frozen-lockfile

FROM node:20.14-bookworm-slim AS runtime
USER node
ENV NODE_ENV production

WORKDIR /app

COPY --chown=node:node --from=app-build /tmp/app/dist ./dist
COPY --chown=node:node --from=app-build /tmp/app/package.json ./
COPY --chown=node:node --from=prod-deps /tmp/app/node_modules ./node_modules

CMD [ "node", \
  "-r", "./dist/utils/opentelemetry.js", \
  "./dist/index.js" ]
