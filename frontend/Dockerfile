FROM node:20-alpine

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk --no-cache add python3 make g++

ADD . /app
WORKDIR /app

RUN npm i --location=global pnpm
RUN pnpm i
