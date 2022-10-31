FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY next.config.js package.json yarn.lock .env .next/standalone/ ./

RUN apk add --no-cache --update dumb-init

COPY public public/
COPY .next/static/ .next/static
RUN chown -R node.node /app

EXPOSE 3000

USER node

CMD ["dumb-init", "node", "server.js"]
