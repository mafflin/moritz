module Api::V2
  class SettingsController < ApplicationController
    def fetch_current
      @settings = {
        group_colors: Group::COLORS,
        unmatched_id: Group::UNMATCHED_ID,
      }
    end
  end
end
