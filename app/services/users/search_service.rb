module Users
  class SearchService < ApplicationService
    def perform
      User.all.order(:name)
    end
  end
end
