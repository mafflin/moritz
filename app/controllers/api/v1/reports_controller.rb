module Api::V1
  class ReportsController < ApplicationController
    def create
      decoded = Reports::DecodeService.new(report_params[:encoded]).perform
      report = Reports::ParseService.new(decoded).perform
      payments = Payments::ImportService.new(current_user, report).perform

      if payments
        head :created
      else
        head :unprocessable_entity
      end
    end

    private

    def report_params
      params.require(:report).permit(:encoded)
    end
  end
end
