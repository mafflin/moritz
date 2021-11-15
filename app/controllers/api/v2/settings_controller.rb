module Api::V2
  class SettingsController < ApplicationController
    def fetch_current
      @settings = {
        group_colors: Group::COLORS
      }
    end
  end
end
