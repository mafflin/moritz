module Api
  module V2
    class SettingsController < ApplicationController
      before_action :set_setting

      def fetch_current
      end

      def update_current
        if @setting.update(setting_params)
          render :fetch_current
        else
          head :unprocessable_entity
        end
      end

      private

      def set_setting
        @setting = current_user.setting || current_user.create_setting
      end

      def setting_params
        params.require(:setting).permit(:panel_expanded, :dark_theme)
      end
    end
  end
end
