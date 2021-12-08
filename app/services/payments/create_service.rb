module Payments
  class CreateService < ApplicationService
    def initialize(user, attributes)
      @user = user
      @attributes = attributes
    end

    def perform
      @payment = Payment.new(**@attributes, user: @user)
      @payment if @payment.save
    end
  end
end
