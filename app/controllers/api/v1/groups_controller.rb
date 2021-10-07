module Api::V1
  class GroupsController < ApplicationController
    before_action :set_group, only: [:show, :update, :destroy]

    def index
      @groups = current_user.groups
    end

    def show
    end

    def create
      @group = Group.new(group_params)

      if @group.save
        render :show, status: :created
      else
        render json: @group.errors, status: :unprocessable_entity
      end
    end

    def update
      if @group.update(group_params)
        render :show
      else
        render json: @group.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @group.destroy
    end

    private

    def set_group
      @group = Group.find(params[:id])
    end

    def group_params
      params.require(:group).permit(:name).merge(user_id: current_user.id)
    end
  end
end
