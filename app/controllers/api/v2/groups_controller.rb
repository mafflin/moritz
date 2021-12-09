module Api
  module V2
    class GroupsController < ApplicationController
      before_action :set_group, only: [:fetch_single, :update_single, :delete_single]

      def create_single
        @group = Group.new(group_params)

        if @group.save
          render :fetch_single, status: :created
        else
          render json: @group.errors, status: :unprocessable_entity
        end
      end

      def delete_single
        @group.destroy
      end

      def fetch_list
        @groups = current_user.groups
      end

      def fetch_single
      end

      def update_single
        if @group.update(group_params)
          render :fetch_single
        else
          render json: @group.errors, status: :unprocessable_entity
        end
      end

      private

      def set_group
        @group = current_user.groups.find(params[:id])
      end

      def group_params
        params.require(:group)
          .permit(:name, :color)
          .merge(user_id: current_user.id)
      end
    end
  end
end
