FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache --update dumb-init

COPY next.config.js .
COPY public public/
COPY .next .next/
COPY node_modules node_modules/
COPY package.json .env ./
RUN chown -R node.node /app

EXPOSE 3000

USER node

CMD ["dumb-init", "yarn", "start"]
