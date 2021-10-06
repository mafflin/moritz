require 'rails_helper'

RSpec.describe Reports::ParseService do
  describe '#initialize' do
    it 'matches db csv to a corresponding service' do
      report = file_fixture('db.csv').read
      db_service = Reports::ParseService.new(report)
        .instance_variable_get(:@bank_specific_service)

      expect(db_service).to be_a(Parsers::DbParseService)
    end

    it 'matches n26 csv to a corresponding service' do
      report = file_fixture('n26.csv').read
      n26_service = Reports::ParseService.new(report)
        .instance_variable_get(:@bank_specific_service)

      expect(n26_service).to be_a(Parsers::N26ParseService)
    end

    it 'matches revolut csv to a corresponding service' do
      report = file_fixture('revolut.csv').read
      revolut_service = Reports::ParseService.new(report)
        .instance_variable_get(:@bank_specific_service)

      expect(revolut_service).to be_a(Parsers::RevolutParseService)
    end

    it 'raises an error if report is not recognized' do
      csv = 'unsupported, csv, report, type'

      expect { Reports::ParseService.new(csv) }.to raise_error(Reports::ParseError)
    end
  end
end
