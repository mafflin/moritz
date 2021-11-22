module Reports
  class ParseService < ApplicationService
    PARSERS = [
      {
        service: Parsers::DbParseService,
        match: 'Booking date;Value date;Transaction Type'
      },
      {
        service: Parsers::N26ParseService,
        match: '"Date","Payee","Account number"'
      },
      {
        service: Parsers::CommerzParseService,
        match: 'Bank code of account of initiator,IBAN of account of initiator,Category'
      },
      {
        service: Parsers::RevolutParseService,
        match: 'Type,Product,Started Date'
      },
    ]

    def initialize(csv)
      parser = PARSERS.find { |entry| csv.include?(entry[:match]) }

      raise ParseError.new('Unknown Bank or invalid file format!') if !parser

      @bank_specific_service = parser[:service].new(csv)
    end

    def perform
      @bank_specific_service.perform
    end
  end

  class ParseError < StandardError
  end
end
