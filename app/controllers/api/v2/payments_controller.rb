module Api
  module V2
    class PaymentsController < ApplicationController
      before_action :set_payment, only: [:fetch_single, :update_single]

      DEFAULT_ORDER = 'payments.booked_at DESC, payments.created_at DESC'.freeze

      def fetch_list
        @payments = Payments::FetchService.new(
          user: current_user,
          date: params[:date],
          group_id: params[:group_id]
        ).perform.order(DEFAULT_ORDER)
      end

      def fetch_search_results
        @payments = Payments::SearchService.new(
          user: current_user,
          q: params[:q]
        ).perform.order(DEFAULT_ORDER)

        render :fetch_list
      end

      def fetch_single
      end

      def update_single
        if @payment.update(payment_params)
          render :fetch_single
        else
          render_errors json: @payment.errors, status: :unprocessable_entity
        end
      end

      private

      def payment_params
        params.require(:payment)
          .permit(:id, :note, :withdrawal)
      end

      def set_payment
        @payment = current_user.payments.find(params[:id])
      end
    end
  end
end
