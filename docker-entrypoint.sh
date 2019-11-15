#!/bin/bash

ATTEMPTS=10

test_db_connection() {
  for i in $(seq 1 $ATTEMPTS); do
    echo 'SELECT 1+1' | PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER $POSTGRES_DB
    if [ $? -eq  0 ]; then
      return
    else
      echo $i
      sleep 1
    fi
  done
  exit 1
}

remove_outdated_pids() {
  rm -rf /app/tmp/pids/server.pid
}

install_gems() {
  bundle install --gemfile=./Gemfile
}

migrate_db() {
  bundle exec rake db:migrate
}

start_dev_server() {
  exec bundle exec rails s -b 0.0.0.0
}

start_puma() {
  exec bundle exec puma --config config/puma.rb
}

start_tests() {
  exec bundle exec rspec
}

run_app() {
  case $RAILS_ENV in
    development )
      start_dev_server
        ;;
    test )
      start_tests
        ;;
    * )
      start_puma
      ::
  esac
}

# MAIN

remove_outdated_pids
install_gems
test_db_connection
migrate_db
run_app
