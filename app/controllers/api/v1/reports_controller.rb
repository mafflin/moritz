module Api::V1
  class ReportsController < ApplicationController
    def create
      report = Reports::ParseService.new(report_params[:encoded]).perform

      if report.present?
        Payments::ImportService.new(current_user, report).perform

        render :show, status: :created
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
