module Parsers
  class RevolutParseService < BaseParseService
    BANK = Payment::BANKS[:revolut]
    TRANSACTION_TYPE = 'Revolut payment'
    DATE_FORMAT = '%d %b %Y'
    DEBIT_MATCH = 'Fee:'
    CURRENCY = 'EUR'

    def initialize(report)
      # Revolut CSV is crap!
      @report = report
        .gsub(/ *+?, *+?/, ',') # Remove whitespaces around commas.
        .gsub(/(""[^",]+),([^"]+"")/, '\1 \2') # Remove commas from double-quoted strings.
        .gsub(/("[^",]+),([^"]+")/, '\1.\2') # Replace commas by dots in quoted currency-strings.
        .gsub("'", ' ') # Replace single quotes with spaces.
        .gsub('"', '') # Remove all the quotes.
    end

    private

    def parse(entry)
      original_amount = parse_original_amount(entry)
      amount = parse_amount(original_amount)
      is_debit = is_debit?(amount)

      {
        bank: BANK,
        booked_at: parse_booked_at_date(entry),
        transaction_type: TRANSACTION_TYPE,
        details: entry['Description'],
        currency: CURRENCY,
        original_debit: is_debit && original_amount,
        original_credit: !is_debit && original_amount,
        debit: is_debit ? amount : 0,
        credit: !is_debit ? amount : 0,
      }
    end

    def params
      @params ||= {
        headers: true,
        encoding: ENCODING,
        col_sep: COL_SEP,
      }
    end

    def parse_original_amount(entry)
      paid_out = entry['Paid Out (EUR)']
      paid_in = entry['Paid In (EUR)']

      return paid_in if paid_out.blank?
      return "-#{paid_in}" if paid_out.include?(DEBIT_MATCH)
      return "-#{paid_out}"
    end

    def parse_amount(value)
      value&.to_f || 0
    end

    def is_debit?(value)
      value < 0
    end

    def parse_booked_at_date(entry)
      booked_at = entry['Completed Date'].upcase.gsub('SEPT', 'SEP')

      Date.strptime(booked_at, DATE_FORMAT)
    end
  end
end
