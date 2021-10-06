module Parsers
  class DbParseService < BaseParseService
    BANK = Payment::BANKS[:db]
    COL_SEP = ';'
    ENCODING_IN = 'ISO-8859-1'
    DATE_FORMAT = '%m/%d/%Y'
    # Skips additional non-csv lines an the start and the end of the file.
    # Matches a double date 09/28/2021;09/27/2021 in the beginning of the line.
    # Or "Booking" in the header.
    LINE_MATCH = /^((?!([0-9]{2}\/[0-9]{2}\/[0-9]{4};[0-9]{2}\/[0-9]{2}\/[0-9]{4}|Booking)).)*$/

    def initialize(report)
      @report = report.encode(ENCODING, ENCODING_IN)
    end

    private

    def parse(entry)
      {
        bank: BANK,
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
      value&.gsub(/[,]/, '')&.to_f || 0
    end
  end
end
