require 'rails_helper'

RSpec.describe Parsers::N26ParseService do
  dummy_path = Rails.root.join('test', 'dummies', 'reports', 'n26.csv')
  report = File.read(dummy_path)

  describe '#perform' do
    before(:all) do
      @parsed = Parsers::N26ParseService.new(report).perform
      @third = @parsed[2]
      @seventh = @parsed[6]
    end

    it 'parses all the entries' do
      expect(@parsed.length).to eq(11)
    end

    it 'replaces the details and transaction_type' do
      expect(@third[:transaction_type]).to eq('MasterCard Payment')
      expect(@third[:details]).to eq('MVG HANDY TICKET')
    end

    it 'parses the debit field' do
      expect(@third[:debit]).to eq(-3.4)
      expect(@third[:original_debit]).to eq('-3.4')
      expect(@third[:credit]).to eq(0)
      expect(@third[:original_credit]).to eq(nil)
    end

    it 'parses the credit field' do
      expect(@seventh[:credit]).to eq(200)
      expect(@seventh[:original_credit]).to eq('200.0')
      expect(@seventh[:debit]).to eq(0)
      expect(@seventh[:original_debit]).to eq(nil)
    end

    it 'parses the booked_at date' do
      expect(@seventh[:booked_at]).to eq(Date.parse('17.09.2021'))
    end
  end
end
