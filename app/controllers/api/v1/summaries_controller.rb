module Api::V1
  class SummariesController < ApplicationController
    def index
      @summaries = Summaries::SearchService.new(
        user: current_user,
        date: params[:date],
      ).perform
    end
  end
end
