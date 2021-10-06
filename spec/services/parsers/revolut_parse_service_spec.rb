require 'rails_helper'

RSpec.describe Parsers::RevolutParseService do
  dummy_path = Rails.root.join('test', 'dummies', 'reports', 'revolut.csv')
  report = File.read(dummy_path)

  describe '#perform' do
    before(:all) do
      @parsed = Parsers::RevolutParseService.new(report).perform

      @first, @second, @third, @fourth = @parsed
    end

    it 'parses all the entries' do
      expect(@parsed.length).to eq(6)
    end

    it 'parses details' do
      expect(@first[:details]).to eq('Google Pay Top-Up by *0000')
      expect(@fourth[:details]).to eq('Atlantic Ferries,sa')
    end

    it 'parses transaction_type' do
      expect(@first[:transaction_type]).to eq('TOPUP')
      expect(@fourth[:transaction_type]).to eq('CARD_PAYMENT')
    end

    it 'parses the debit field' do
      expect(@fourth[:debit]).to eq(-16.5)
      expect(@fourth[:original_debit]).to eq('-16.50')
      expect(@fourth[:credit]).to eq(0)
      expect(@fourth[:original_credit]).to eq(nil)
    end

    it 'parses the credit field' do
      expect(@second[:credit]).to eq(100)
      expect(@second[:original_credit]).to eq('100.00')
      expect(@second[:debit]).to eq(0)
      expect(@second[:original_debit]).to eq(nil)
    end

    it 'parses the booked_at date' do
      expect(@first[:booked_at]).to eq(Date.parse('13.07.2021'))
      expect(@second[:booked_at]).to eq(Date.parse('24.07.2021'))
      expect(@third[:booked_at]).to eq(Date.parse('23.07.2021'))
      expect(@fourth[:booked_at]).to eq(Date.parse('02.10.2021'))
    end
  end
end
