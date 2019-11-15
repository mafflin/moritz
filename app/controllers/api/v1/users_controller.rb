module Api::V1
  class UsersController < ApplicationController
    before_action :set_user, only: [:update, :destroy]

    # GET /users
    def index
      @users = Users::SearchService.new.perform
    end

    # GET /users/1
    def show
      @user = User.find(params[:id])
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
      if @user.update(user_params)
        render :show
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # DELETE /users/1
    def destroy
      @user.destroy
    end

    private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:users).permit(:name)
    end

    def search_params
      params.permit(:query, :page)
    end
  end
end
