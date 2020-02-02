module Api::V1
  class PaymentsController < ApplicationController
    def index
      @payments = Payments::SearchService.new(
        user: current_user,
        date: params[:date],
        group_id: params[:group_id]
      ).perform
    end

    def show
      @payment = current_user.payments.find(params[:id])
    end


    def update
      @payment = Payments::UpdateService.new(
        user: current_user,
        attributes: payment_params,
      ).perform

      render :show
    end

    private

    def payment_params
      params.require(:payment).permit(:id, :note)
    end
  end
end
