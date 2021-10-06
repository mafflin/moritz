require 'rails_helper'

RSpec.describe Parsers::RevolutParseService do
  dummy_path = Rails.root.join('test', 'dummies', 'reports', 'revolut.csv')
  report = File.read(dummy_path)

  describe '#initialize' do
    before(:all) do
      @processed_report = Parsers::RevolutParseService.new(report).instance_variable_get(:@report)
    end

    it 'pre-processes the csv-report' do
      expect(@processed_report).not_to include(', ', ' ,', '"', "'")
      expect(@processed_report).to include('HUF 2.300.00')
    end
  end

  describe '#perform' do
    before(:all) do
      @parsed = Parsers::RevolutParseService.new(report).perform
    end

    it 'parses all the entries' do
      expect(@parsed.length).to eq(19)
    end

    it 'replaces commas and single quotes with spaces' do
      expect(@parsed[3][:details]).to eq('Atlantic Ferries sa')
      expect(@parsed[6][:details]).to eq('Grão D Areia - Vestuário Lda.')
      expect(@parsed[9][:details]).to eq('Leal Leal & Inês Lda')
    end

    it 'parses the debit field from an entry with a fee' do
      expect(@parsed[17][:debit]).to eq(-6.61)
      expect(@parsed[17][:original_debit]).to eq('-6.61')
      expect(@parsed[17][:credit]).to eq(0)
    end

    it 'parses the debit field from an entry without a fee' do
      expect(@parsed[1][:debit]).to eq(-4.40)
      expect(@parsed[1][:original_debit]).to eq('-4.40')
      expect(@parsed[1][:credit]).to eq(0)
    end

    it 'parses the credit field' do
      expect(@parsed[10][:credit]).to eq(200)
      expect(@parsed[10][:original_credit]).to eq('200.00')
      expect(@parsed[10][:debit]).to eq(0)
    end

    it 'parses the booked_at date' do
      expect(@parsed[0][:booked_at]).to eq(Date.parse('04.10.2021'))
      expect(@parsed[12][:booked_at]).to eq(Date.parse('20.09.2021'))
    end
  end
end
