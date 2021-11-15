FROM node:14-alpine

RUN apk --no-cache add python3 make g++

COPY package.json /
COPY package-lock.json /

RUN npm i -g @vue/cli \
      && npm i

ADD . /app
WORKDIR /app
