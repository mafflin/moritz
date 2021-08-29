require 'csv'

module Reports
  class BaseBankParseService < ApplicationService
    COL_SEP = ','
    ENCODING = 'UTF-8'

    def initialize(report)
      @report = report
    end
  end
end
