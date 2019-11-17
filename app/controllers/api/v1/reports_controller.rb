module Api::V1
  class ReportsController < ApplicationController
    def create
      decoded = Base64.decode64(report_params[:encoded]).gsub('"', '')
      report = Reports::UploadService.new(current_user, decoded).perform

      if report
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
