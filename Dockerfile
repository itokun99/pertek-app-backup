FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn lint && yarn build

FROM node:lts-alpine

WORKDIR /app

COPY --from=0 /app/next.config.js .
COPY --from=0 /app/public public/
COPY --from=0 /app/.next .next/
COPY --from=0 /app/node_modules node_modules/
COPY package.json yarn.lock .env ./
RUN chown -R node.node /app

EXPOSE 3000

USER node

CMD ["yarn", "start"]
