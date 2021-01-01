require 'csv'

module Reports
  class ParseService < ApplicationService
    DB_IDENTIFIER = 'Customer number:'

    def initialize(report)
      is_db = report.include?(DB_IDENTIFIER)
      @service = is_db ? DbParseService.new(report) : N26ParseService.new(report)
    end

    def perform
      @service.perform
    end
  end
end
