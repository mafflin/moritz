require 'csv'

module Reports
  class ParseService < ApplicationService
    COL_SEP = ';'
    THOUSAND_SEP = ','
    ENCODING = 'ISO-8859-1'
    DATE_FORMAT = '%m/%d/%Y'
    LINE_MATCH = /^((?!(\d\d\/\d\d\/\d\d\d\d;\d\d\/\d\d\/\d\d\d\d|Booking)).)*$/

    def initialize(report)
      @report = report
    end

    def perform
      CSV.parse(@report, **params).map { |line| parse(line.to_hash) }
    end

    private

    def parse(entry)
      {
        booked_at: Date.strptime(entry['Booking date'], DATE_FORMAT),
        transaction_type: entry['Transaction Type'],
        details: entry['Payment Details'],
        beneficiary: entry['Beneficiary / Originator'],
        customer_reference: entry['Customer Reference'],
        mandate_reference: entry['Mandate Reference'],
        external_creditor_id: entry['Creditor ID'],
        currency: entry['Currency'],
        original_debit: entry['Debit'],
        original_credit: entry['Credit'],
        debit: parse_amount(entry['Debit']),
        credit: parse_amount(entry['Credit']),
      }
    end

    def params
      @params ||= {
        headers: true,
        encoding: ENCODING,
        col_sep: COL_SEP,
        skip_lines: LINE_MATCH
      }
    end

    def parse_amount(value)
      value ? value.gsub(THOUSAND_SEP, '').to_f : 0.00
    end
  end
end
