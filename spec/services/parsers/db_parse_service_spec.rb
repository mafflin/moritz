require 'rails_helper'

RSpec.describe Parsers::DbParseService do
  before(:all) do
    @report = file_fixture('db.csv').read
  end

  describe '#initialize' do
    before(:all) do
      @processed_report = Parsers::DbParseService.new(@report).instance_variable_get(:@report)
    end

    it 'pre-processes the csv-report' do
      expect(@processed_report.encoding).to eq(Encoding::UTF_8)
    end
  end

  describe '#perform' do
    before(:all) do
      @parsed = Parsers::DbParseService.new(@report).perform
      @first, @second, @third = @parsed
    end

    it 'parses all the entries' do
      expect(@parsed.length).to eq(9)
    end

    it 'replaces the details and transaction_type' do
      expect(@third[:transaction_type]).to eq('Debit Card Payment')
      expect(@third[:details])
        .to eq('EDEKA MUC IMPLERSTR//MUENCHEN/DE 07-04-2021T16:46:15 Folgenr. 009 Verfalld. 1223')
    end

    it 'parses the debit field' do
      expect(@second[:debit]).to eq(-89.66)
      expect(@second[:original_debit]).to eq('-89.66')
      expect(@second[:credit]).to eq(0)
    end

    it 'parses the credit field' do
      expect(@first[:credit]).to eq(300)
      expect(@first[:original_credit]).to eq('300.00')
      expect(@first[:debit]).to eq(0)
    end

    it 'parses the booked_at date' do
      expect(@first[:booked_at]).to eq(Date.parse('07.04.2021'))
    end
  end
end
