module Payments
  class CreateService < ApplicationService
    def initialize(user, attributes)
      @user = user
      @attributes = attributes
    end

    def perform
      Payment.create(user: @user, **@attributes)
    end
  end
end
