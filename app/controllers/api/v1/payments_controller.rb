module Api::V1
  class PaymentsController < ApplicationController
    def index
      @payments = current_user.payments.by_month(date)
    end

    private

    def date
      params[:date] ? Date.parse(params[:date]) : Date.today
    end
  end
end
