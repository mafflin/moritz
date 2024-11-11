# rubocop:disable Layout/LineLength
require 'rails_helper'

RSpec.describe Parsers::CommerzParseService do
  before(:all) do
    @report = file_fixture('commerz.csv').read
  end

  describe '#perform' do
    before(:all) do
      @parsed = Parsers::CommerzParseService.new(@report).perform

      @first, @second, @third, @fourth = @parsed
    end

    it 'parses all the entries' do
      expect(@parsed.length).to eq(4)
    end

    it 'parses details' do
      expect(@first[:details]).to eq('Zillertaler Gletscherb Hintertux A T Karte Nr. 1234 0000 0000 4321 Mastercard Debit Zillertaler Gletscherb Hintertux AUT 2021-11-13T09:03:09 Kartenzahlung')
      expect(@fourth[:details]).to eq('Greek Guy Die Turkei End-to-End-Ref.: NOTPROVIDED Kundenreferenz: XXX01')
    end

    it 'parses transaction_type' do
      expect(@first[:transaction_type]).to eq('Credit Card Payment')
      expect(@fourth[:transaction_type]).to eq('Income')
    end

    it 'parses the debit field' do
      expect(@first[:debit]).to eq(-117)
      expect(@first[:original_debit]).to eq('-117.00')
      expect(@first[:credit]).to eq(0)
      expect(@first[:original_credit]).to eq(nil)
    end

    it 'parses the credit field' do
      expect(@fourth[:credit]).to eq(500)
      expect(@fourth[:original_credit]).to eq('500.00')
      expect(@fourth[:debit]).to eq(0)
      expect(@fourth[:original_debit]).to eq(nil)
    end

    it 'parses the booked_at date' do
      expect(@first[:booked_at]).to eq(Date.parse('16.11.2021'))
      expect(@second[:booked_at]).to eq(Date.parse('13.11.2021'))
      expect(@third[:booked_at]).to eq(Date.parse('11.11.2021'))
      expect(@fourth[:booked_at]).to eq(Date.parse('19.10.2021'))
    end
  end
end
# rubocop:enable Layout/LineLength
