module Payments
  class CreateService < ApplicationService
    ALGORITHM = 'sha256'
    DIGEST_PARAMS = [
      :booked_at,
      :transaction_type,
      :details,
      :beneficiary,
      :customer_reference,
      :mandate_reference,
      :external_creditor_id,
      :currency,
      :original_debit,
      :original_credit,
    ]

    def initialize(user, attributes)
      @user = user
      @attributes = attributes
    end

    def perform
      payment = Payment.new(
        **@attributes,
        user: @user,
        digest: digest
      )

      run_post_create_hooks if payment.save
    end

    private

    def digest
      value = @attributes.values_at(*DIGEST_PARAMS).join
      secret = @user.id

      Base64.strict_encode64(OpenSSL::HMAC.digest(ALGORITHM, secret, value))
    end

    def run_post_create_hooks
      GetPaymentLocationsJob.perform_later(payment) if geo_service_enabled
    end
  end
end
