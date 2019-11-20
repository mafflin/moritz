module Reports
  class DecodeService < ApplicationService
    def initialize(encoded_csv)
      @encoded_csv = encoded_csv
    end

    def perform
      Base64.decode64(@encoded_csv).gsub('"', '')
    end
  end
end
