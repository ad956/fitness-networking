FROM node:20-alpine

WORKDIR /server

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

CMD [ "npm","start" ]