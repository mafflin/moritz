require 'csv'

module Reports
  class ParseService < ApplicationService
    PARSERS = [
      { service: DbParseService, match: 'Customer number:' },
      { service: N26ParseService, match: 'Amount (Foreign Currency)' },
      { service: RevolutParseService, match: 'Paid Out (EUR)' },
    ]

    def initialize(report)
      parser = PARSERS.find { |entry| report.include?(entry[:match]) }

      raise StandardError.new('Unknown Bank or invalid file format!') if !parser

      @service = parser[:service].new(report)
    end

    def perform
      @service.perform
    end
  end
end
