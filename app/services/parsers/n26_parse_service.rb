module Parsers
  class N26ParseService < BaseParseService
    BANK = Payment::BANKS[:n26]
    DATE_FORMAT = '%Y-%m-%d'.freeze

    private

    def parse(entry)
      original_amount = entry['Amount (EUR)']
      amount = parse_amount(original_amount)
      is_debit = debit?(amount)

      {
        bank: BANK,
        booked_at: Date.strptime(entry['Booking Date'], DATE_FORMAT),
        transaction_type: entry['Type'],
        details: entry['Partner Name'],
        customer_reference: entry['Payment Reference'],
        currency: entry['Type Foreign Currency'],
        original_debit: is_debit ? original_amount : nil,
        original_credit: !is_debit ? original_amount : nil,
        debit: is_debit ? amount : 0,
        credit: !is_debit ? amount : 0
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
