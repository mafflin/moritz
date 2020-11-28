module Api::V1
  class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update]

    # GET /users
    def index
      @users = Users::SearchService.new.perform
    end

    # GET /users/1
    def show
    end

    # POST /users
    def create
      @user = User.new(user_params)

      if @user.save
        render :show, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    def update
      if Users::UpdateService.new(user: current_user, params: user_params).perform
        render :show
      else
        head :unprocessable_entity
      end
    end

    private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :avatar)
    end

    def search_params
      params.permit(:query, :page)
    end
  end
end
