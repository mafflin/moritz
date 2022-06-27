FROM node:17-alpine

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk --no-cache add python2 python3 make g++

COPY .npmrc /
COPY package.json /
COPY package-lock.json /

RUN npm i --location=global pnpm @vue/cli \
	&& pnpm i

ADD . /app
WORKDIR /app
