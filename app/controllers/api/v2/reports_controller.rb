module Api::V2
  class ReportsController < ApplicationController
    def create_single
      csv = Base64.decode64(report_params[:encoded])
      report = Reports::ParseService.new(csv).perform

      if report.present?
        Payments::ImportService.new(current_user, report).perform

        head :no_content
      else
        head :unprocessable_entity
      end
    rescue Reports::ParseError => e
      render json: { file: [e] }, status: :unprocessable_entity
    end

    private

    def report_params
      params.require(:report).permit(:encoded)
    end
  end
end
