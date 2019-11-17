module Reports
  class UploadService < ApplicationService
    def initialize(user, report)
      @user = user
      @report = report
    end

    def perform
      create_payments(ParseService.new(@report).perform)
    end

    private

    def create_payments(report)
      report.each { |entry| Payments::CreateService.new(@user, entry).perform }
    end
  end
end
