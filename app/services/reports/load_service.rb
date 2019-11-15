module Reports
  class LoadService < ApplicationService
    FORMAT = '*.csv'
    DEFAULT_PATH = ['tmp', 'storage']

    def initialize(path = DEFAULT_PATH)
      @path = path
    end

    def perform
      files_to_parse.map { |file| ParseService.new(file).perform }
    end

    private

    def directory
      @directory ||= Rails.root.join(*@path)
    end

    def files_to_parse
      @files_to_parse = directory.glob(FORMAT)
    end
  end
end
