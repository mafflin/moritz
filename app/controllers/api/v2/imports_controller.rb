module Api
  module V2
    class ImportsController < ApplicationController
      def create_single
        csv = Base64.decode64(import_params[:encoded])
        report = Reports::ParseService.new(csv).perform

        @import = current_user.imports.create

        ImportJob.perform_later(
          user: current_user,
          import: @import,
          report: report
        )
      rescue Reports::ParseError => e
        render json: { csv: e }, status: :unprocessable_entity
      rescue ArgumentError
        head :bad_request
      end

      private

      def import_params
        params.require(:csv).permit(:encoded)
      end
    end
  end
end
