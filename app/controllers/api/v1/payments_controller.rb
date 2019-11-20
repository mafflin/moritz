module Api::V1
  class PaymentsController < ApplicationController
    def index
      @payments = current_user.payments
    end
  end
end
