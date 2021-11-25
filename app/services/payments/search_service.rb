module Payments
  class SearchService < ApplicationService
    def initialize(user:, q:)
      @user = user
      @q = q
    end

    def perform
      @user.payments.match(@q).order(FetchService::DEFAULT_ORDER)
    end
  end
end
