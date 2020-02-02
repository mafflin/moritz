module Payments
  class UpdateService < ApplicationService
    def initialize(user:, attributes:)
      @payment = user.payments.find(attributes[:id])
      @attributes = ActiveSupport::HashWithIndifferentAccess.new(attributes)
        .without(:id)
    end

    def perform
      @payment.update(**@attributes)
      @payment
    end
  end
end
