module Payments
  class SearchService < ApplicationService
    def initialize(user:, q:)
      @user = user
      @q = q
    end

    def perform
      @user.payments.search(@q)
    end
  end
end
