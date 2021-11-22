module Api::V2
  class UsersController < ApplicationController
    skip_before_action :require_login, only: [:fetch_list]
    before_action :set_user, only: [:fetch_current, :update_current]

    def fetch_list
      @users = Users::SearchService.new.perform
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
      params.require(:user).permit(:name, :avatar_base64)
    end
  end
end
