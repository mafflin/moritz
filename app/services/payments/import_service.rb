module Payments
  class ImportService < ApplicationService
    def initialize(user, report)
      @user = user
      @report = report
    end

    def perform
      [{}, *@report, {}].each_cons(3).map do |left_neighbor, entry, right_neighbor|
        Payments::CreateService.new(@user, entry, left_neighbor, right_neighbor).perform
      end
    end
  end
end
