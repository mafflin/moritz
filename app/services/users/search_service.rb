module Users
  class SearchService < ApplicationService
    def perform
      User.all.order(:created_at)
    end
  end
end
