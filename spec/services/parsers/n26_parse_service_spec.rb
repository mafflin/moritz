require 'rails_helper'

RSpec.describe Parsers::N26ParseService do
  dummy_path = Rails.root.join('test', 'dummies', 'reports', 'n26.csv')
  report = File.read(dummy_path)

  describe '#perform' do
    before(:all) do
      @parsed = Parsers::N26ParseService.new(report).perform
    end

    it 'parses all the entries' do
      expect(@parsed.length).to eq(11)
    end

    it 'replaces the details and transaction_type' do
      expect(@parsed[2][:transaction_type]).to eq('MasterCard Payment')
      expect(@parsed[2][:details]).to eq('MVG HANDY TICKET')
    end

    it 'parses the debit field' do
      expect(@parsed[2][:debit]).to eq(-3.4)
      expect(@parsed[2][:original_debit]).to eq('-3.4')
      expect(@parsed[2][:credit]).to eq(0)
    end

    it 'parses the credit field' do
      expect(@parsed[6][:credit]).to eq(200)
      expect(@parsed[6][:original_credit]).to eq('200.0')
      expect(@parsed[6][:debit]).to eq(0)
    end

    it 'parses the booked_at date' do
      expect(@parsed[6][:booked_at]).to eq(Date.parse('17.09.2021'))
      expect(@parsed[10][:booked_at]).to eq(Date.parse('04.10.2021'))
    end
  end
end
