module Api::V1
  class PaymentsController < ApplicationController
    def index
      @payments = Payments::SearchService.new(user: current_user, **query_params).perform
    end

    private

    def query_params
      params.permit(:query).permit(:date, :groupId)
    end
  end
end
