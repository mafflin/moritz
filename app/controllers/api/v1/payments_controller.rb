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
      if Payments::UpdateService.new(
        user: current_user,
        attributes: payment_params,
      ).perform
        head :no_content
      else
        head :unprocessable_entity
      end
    end

    private

    def payment_params
      params.require(:payment).permit(:id, :note, :withdrawal)
    end
  end
end
