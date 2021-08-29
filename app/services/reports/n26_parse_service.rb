module Reports
  class N26ParseService < BaseBankParseService
    BANK = Payment::BANKS[:n26]
    DATE_FORMAT = '%Y-%m-%d'

    def perform
      CSV.parse(@report, **params).map { |line| parse(line.to_hash) }
    end

    private

    def parse(entry)
      original_amount = entry['Amount (EUR)']
      amount = parse_amount(original_amount)
      is_debit = is_debit?(amount)

      {
        bank: BANK,
        booked_at: Date.strptime(entry['Date'], DATE_FORMAT),
        transaction_type: entry['Transaction type'],
        details: entry['Category'],
        beneficiary: entry['Payee'],
        customer_reference: entry['Payment reference'],
        currency: entry['Type Foreign Currency'],
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

    def parse_amount(value)
      value&.to_f || 0
    end

    def is_debit?(value)
      value < 0
    end
  end
end
