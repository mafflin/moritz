module Api
  module V2
    class UsersController < ApplicationController
      skip_before_action :require_login, only: [:fetch_list, :create_single]
      before_action :set_user, only: [:fetch_current, :update_current]

      def create_single
        @user = User.new(user_params)

        if @user.save
          render :fetch_current, status: :created
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def fetch_current
      end

      def update_current
        if Users::UpdateService.new(user: @user, params: user_params).perform
          render :fetch_current
        else
          head :unprocessable_entity
        end
      rescue Users::UpdateError => e
        render json: { avatar: [e] }, status: :unprocessable_entity
      end

      private

      def set_user
        @user = current_user
      end

      def user_params
        params.require(:user).permit(:name, :password, :avatar_base64)
      end
    end
  end
end
