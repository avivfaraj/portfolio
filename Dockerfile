FROM node:22-alpine3.22 AS base

RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app

COPY package*.json ./

EXPOSE 3000


FROM base AS builder

COPY . .

RUN npm ci
RUN npm run build


FROM node:22-alpine3.22 AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]


FROM base AS dev

ENV NODE_ENV=development

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
