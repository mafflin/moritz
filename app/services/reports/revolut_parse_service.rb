require 'csv'

module Reports
  class RevolutParseService < ApplicationService
    BANK = Payment::BANKS[:revolut]
    COL_SEP = ','
    ENCODING = 'UTF-8'
    DATE_FORMAT = '%d %b %Y'
    DEBIT_MATCH = 'Fee:'
    CURRENCY = 'EUR'

    def initialize(report)
      @report = report.gsub('"', '')
    end

    def perform
      CSV.parse(@report, **params).map do |line|
        formatted = line.to_h
          .map { |key, value| [key&.strip, value&.strip] }
          .to_h

        parse(formatted)
      end
    end

    private

    def parse(entry)
      original_amount = parse_original_amount(entry)
      amount = parse_amount(original_amount)
      is_debit = is_debit?(amount)

      {
        bank: BANK,
        booked_at: Date.strptime(entry['Completed Date'], DATE_FORMAT),
        transaction_type: nil,
        details: entry['Description'],
        beneficiary: nil,
        mandate_reference: nil,
        external_creditor_id: nil,
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
  end
end
