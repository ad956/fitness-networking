FROM node:20-alpine

WORKDIR /app

COPY package.*json ./

RUN npm run ci

COPY . .

ENV NODE_ENV=production

CMD [ "npm","start" ]