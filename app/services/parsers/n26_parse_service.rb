module Parsers
  class N26ParseService < BaseParseService
    BANK = Payment::BANKS[:n26]
    DATE_FORMAT = '%Y-%m-%d'

    private

    def parse(entry)
      original_amount = entry['Amount (EUR)']
      amount = parse_amount(original_amount)
      is_debit = is_debit?(amount)

      {
        bank: BANK,
        booked_at: Date.strptime(entry['Date'], DATE_FORMAT),
        transaction_type: entry['Transaction type'],
        details: entry['Payee'],
        customer_reference: entry['Payment reference'],
        currency: entry['Type Foreign Currency'],
        original_debit: is_debit && original_amount,
        original_credit: !is_debit && original_amount,
        debit: is_debit ? amount : 0,
        credit: !is_debit ? amount : 0,
      }
    end

    def parse_amount(value)
      value&.to_f || 0
    end

    def is_debit?(value)
      value < 0
    end
  end
end
