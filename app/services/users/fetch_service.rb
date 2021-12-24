module Users
  class FetchService < ApplicationService
    def perform
      User.all.order(:created_at)
    end
  end
end
