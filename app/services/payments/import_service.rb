module Payments
  class ImportService < ApplicationService
    def initialize(user, report)
      @user = user
      @report = report
    end

    def perform
      @report.each do |entry|
        Payments::CreateService.new(@user, entry).perform
      end
    end
  end
end
