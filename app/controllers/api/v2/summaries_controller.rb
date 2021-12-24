module Api
  module V2
    class SummariesController < ApplicationController
      def fetch_list
        @summaries = Summaries::FetchService.new(
          user: current_user,
          range: params[:range]
        ).perform
      end
    end
  end
end
