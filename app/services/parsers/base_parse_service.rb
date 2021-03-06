require 'csv'

module Parsers
  class BaseParseService < ApplicationService
    COL_SEP = ','.freeze
    ENCODING = 'UTF-8'.freeze

    def initialize(report)
      @report = report
    end

    def perform
      CSV.parse(@report, **params).map { |line| parse(line.to_hash) }
    end

    protected

    def params
      @params ||= {
        headers: true,
        encoding: ENCODING,
        col_sep: COL_SEP
      }
    end
  end
end
