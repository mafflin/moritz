require 'rails_helper'

RSpec.describe Parsers::N26ParseService do
  before(:all) do
    @report = file_fixture('n26.csv').read
  end

  describe '#perform' do
    before(:all) do
      @parsed = Parsers::N26ParseService.new(@report).perform
      @third = @parsed[2]
      @seventh = @parsed[6]
    end

    it 'parses all the entries' do
      expect(@parsed.length).to eq(11)
    end

    it 'parses the details and transaction_type' do
      expect(@seventh[:transaction_type]).to eq('Credit Transfer')
      expect(@third[:transaction_type]).to eq('Presentment')
      expect(@third[:details]).to eq('HANDYPARKEN MUENCHEN')
    end

    it 'parses the debit field' do
      expect(@third[:debit]).to eq(-3.77)
      expect(@third[:original_debit]).to eq('-3.77')
      expect(@third[:credit]).to eq(0)
      expect(@third[:original_credit]).to eq(nil)
    end

    it 'parses the credit field' do
      expect(@seventh[:credit]).to eq(500)
      expect(@seventh[:original_credit]).to eq('500.00')
      expect(@seventh[:debit]).to eq(0)
      expect(@seventh[:original_debit]).to eq(nil)
    end

    it 'parses the booked_at date' do
      expect(@seventh[:booked_at]).to eq(Date.parse('2024-09-01'))
    end
  end
end
