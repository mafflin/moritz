require 'csv'

module Parsers
  class BaseParseService < ApplicationService
    COL_SEP = ','
    ENCODING = 'UTF-8'

    def initialize(report)
      @report = report
    end
  end
end
