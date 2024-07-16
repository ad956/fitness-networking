FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production

CMD [ "npm","run","preview" ]