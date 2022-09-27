FROM node:18-alpine

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk --no-cache add python3 make g++

COPY .npmrc /
COPY package.json /
COPY package-lock.json /

RUN npm i --location=global pnpm @vue/cli \
	&& pnpm i

ADD . /app
WORKDIR /app
