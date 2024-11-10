require 'rails_helper'

RSpec.describe Payments::ImportService do
  before(:all) do
    @user = User.create(name: 'User!')
    @parsed = Parsers::N26ParseService
      .new(file_fixture('n26.csv').read)
      .perform
  end

  describe '#perform' do
    before(:all) do
      @payments = Payments::ImportService.new(@user, @parsed).perform
    end

    it 'creates all the payments' do
      expect(@payments.length).to eq(11)
    end
  end
end
