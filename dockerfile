FROM --platform=linux/amd64 node:22-slim AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --no-audit --prefer-offline

COPY . .
COPY .env .env

RUN npm run build

ENV NODE_ENV=production
ENV PORT=9007

EXPOSE 9007

CMD ["npm", "start"]