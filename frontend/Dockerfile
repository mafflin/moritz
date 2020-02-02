FROM node:12-alpine

ARG RAILS_ENV=development

COPY package.json /
COPY package-lock.json /

RUN npm i -g @vue/cli \
      && npm i

ADD . /app
WORKDIR /app
