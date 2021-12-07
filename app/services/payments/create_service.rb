module Payments
  class CreateService < ApplicationService
    def initialize(user, attributes)
      @user = user
      @attributes = attributes
    end

    def perform
      @payment = Payment.new(
        **@attributes,
        user: @user
      )

      return unless @payment.save

      run_post_create_hooks
      @payment
    end

    private

    def run_post_create_hooks
      PaymentsChannel.broadcast_to(
        @user,
        @payment.id
      )
    end
  end
end
