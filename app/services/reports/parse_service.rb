module Reports
  class ParseService < ApplicationService
    PARSERS = [
      {
        service: Parsers::DbParseService,
        match: 'Booking date;Value date;Transaction Type'
      },
      {
        service: Parsers::N26ParseService,
        match: '"Booking Date","Value Date","Partner Name","Partner Iban"'
      },
      {
        service: Parsers::CommerzParseService,
        match: 'Bank code of account of initiator,IBAN of account of initiator'
      },
      {
        service: Parsers::RevolutParseService,
        match: 'Type,Product,Started Date'
      }
    ].freeze

    def initialize(csv)
      parser = PARSERS.find { |entry| csv.include?(entry[:match]) }

      raise(ParseError, 'Unknown Bank or invalid file format!') unless parser

      @bank_specific_service = parser[:service].new(csv)
    end

    def perform
      @bank_specific_service.perform
    end
  end

  class ParseError < StandardError
  end
end
