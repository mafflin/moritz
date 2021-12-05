module Parsers
  class RevolutParseService < BaseParseService
    BANK = Payment::BANKS[:revolut]
    TRANSACTION_TYPE = 'Revolut payment'.freeze
    DATE_FORMAT = '%Y-%m-%d'.freeze

    private

    def parse(entry)
      original_amount = entry['Amount']
      amount = parse_amount(original_amount)
      is_debit = debit?(amount)

      {
        bank: BANK,
        booked_at: Date.parse(entry['Started Date'], DATE_FORMAT),
        transaction_type: entry['Type'],
        details: entry['Description'],
        currency: entry['Currency'],
        original_debit: is_debit ? original_amount : nil,
        original_credit: !is_debit ? original_amount : nil,
        debit: is_debit ? amount : 0,
        credit: !is_debit ? amount : 0
      }
    end

    def params
      @params ||= {
        headers: true,
        encoding: ENCODING,
        col_sep: COL_SEP
      }
    end

    def parse_amount(value)
      value&.to_f || 0
    end

    def debit?(value)
      value.negative?
    end
  end
end
