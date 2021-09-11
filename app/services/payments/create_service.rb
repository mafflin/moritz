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

      run_post_create_hooks if @payment.save
    end

    private

    def run_post_create_hooks
      GetPaymentLocationsJob.perform_later(@payment)
    end
  end
end
