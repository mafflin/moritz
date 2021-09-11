module Reports
  class ParseService < ApplicationService
    PARSERS = [
      { service: DbParseService, match: 'Customer number:' },
      { service: N26ParseService, match: 'Amount (Foreign Currency)' },
      { service: RevolutParseService, match: 'Paid Out (EUR)' },
    ]

    def initialize(csv)
      report = csv.gsub('"', '')
      parser = PARSERS.find { |entry| report.include?(entry[:match]) }

      raise StandardError.new('Unknown Bank or invalid file format!') if !parser

      @bank_specific_service = parser[:service].new(report)
    end

    def perform
      @bank_specific_service.perform
    end
  end
end
