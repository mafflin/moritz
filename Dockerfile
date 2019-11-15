FROM ruby:2.6-alpine

ARG RAILS_ENV=development

RUN apk update \
    && apk upgrade \
    && apk --no-cache add \
      bash \
      tzdata \
      libpq postgresql-client postgresql-dev\
      build-base make \
      libgcrypt-dev libxml2 libxml2-dev \
      curl wget git \
      nodejs yarn

ADD . /app
WORKDIR /app

RUN gem install bundler
RUN bundle install
