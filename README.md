# README

* How to run the app
  - create the `.env` file by running `cp .env.sample .env`
  - run `docker-compose up` (if it's not running try to build images first `docker-compose build`)
  - app is available at `http://localhost:8080/`

* How to add users
  - modify `db/seeds.rb` file to something like this:
    ```ruby
      User.create([{ name: 'YOUR_USER_NAME' }])
    ```
    and run `docker-compose run backend rails db:seed`
