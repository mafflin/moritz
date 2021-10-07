module Api::V1
  class UsersController < ApplicationController
    skip_before_action :require_login, only: [:index]
    before_action :set_user, only: [:show, :update]

    def index
      @users = Users::SearchService.new.perform
    end

    def show
    end

    def create
      @user = User.new(user_params)

      if @user.save
        render :show, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    def update
      if Users::UpdateService.new(user: current_user, params: user_params).perform
        render :show
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

    def search_params
      params.permit(:query, :page)
    end
  end
end
