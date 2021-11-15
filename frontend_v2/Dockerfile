FROM node:17-alpine

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk --no-cache add python2 python3 make g++

COPY package.json /
COPY package-lock.json /

RUN npm i -g @vue/cli \
	&& npm i

ADD . /app
WORKDIR /app
