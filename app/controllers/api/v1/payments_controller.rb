module Api::V1
  class PaymentsController < ApplicationController
    def index
      @payments = Payments::SearchService.new(
        user: current_user,
        date: params[:date],
        group_id: params[:group_id]
      ).perform
    end
  end
end
