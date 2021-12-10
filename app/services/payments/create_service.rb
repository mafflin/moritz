module Payments
  class CreateService < ApplicationService
    def initialize(user, attrs, left_neighbor = {}, right_neighbor = {})
      @user = user
      @attrs = attrs
      @left_neighbor = left_neighbor
      @right_neighbor = right_neighbor
    end

    def perform
      @payment = Payment.new(
        **@attrs,
        user: @user,
        digest: Payment.generate_digest(@attrs),
        left_neighbor_digest: Payment.generate_digest(@left_neighbor),
        right_neighbor_digest: Payment.generate_digest(@right_neighbor)
      )

      @payment if @payment.save
    end
  end
end
