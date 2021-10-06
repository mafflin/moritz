require 'rails_helper'

RSpec.describe Parsers::DbParseService do
  dummy_path = Rails.root.join('test', 'dummies', 'reports', 'db.csv')
  report = File.read(dummy_path)

  describe '#initialize' do
    before(:all) do
      @processed_report = Parsers::DbParseService.new(report).instance_variable_get(:@report)
    end

    it 'pre-processes the csv-report' do
      expect(@processed_report.encoding).to eq(Encoding::UTF_8)
    end
  end

  describe '#perform' do
    before(:all) do
      @parsed = Parsers::DbParseService.new(report).perform
    end

    it 'parses all the entries' do
      expect(@parsed.length).to eq(9)
    end

    it 'replaces the details and transaction_type' do
      expect(@parsed[2][:transaction_type]).to eq('Debit Card Payment')
      expect(@parsed[2][:details])
        .to eq('EDEKA MUC IMPLERSTR//MUENCHEN/DE 07-04-2021T16:46:15 Folgenr. 009 Verfalld. 1223')
    end

    it 'parses the debit field' do
      expect(@parsed[1][:debit]).to eq(-89.66)
      expect(@parsed[1][:original_debit]).to eq('-89.66')
      expect(@parsed[1][:credit]).to eq(0)
    end

    it 'parses the credit field' do
      expect(@parsed[0][:credit]).to eq(300)
      expect(@parsed[0][:original_credit]).to eq('300.00')
      expect(@parsed[0][:debit]).to eq(0)
    end

    it 'parses the booked_at date' do
      expect(@parsed[0][:booked_at]).to eq(Date.parse('07.04.2021'))
      expect(@parsed[7][:booked_at]).to eq(Date.parse('28.09.2021'))
    end
  end
end
