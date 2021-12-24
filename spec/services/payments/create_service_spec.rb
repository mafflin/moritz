require 'rails_helper'

RSpec.describe Payments::CreateService do
  before(:all) do
    @report = file_fixture('n26.csv').read
  end
end
