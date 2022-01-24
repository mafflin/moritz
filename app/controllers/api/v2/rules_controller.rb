module Api
  module V2
    class RulesController < ApplicationController
      before_action :set_rule, only: [:delete_single]

      def create_single
        @rule = Rule.new(rule_params)

        if @rule.save
          render :fetch_single, status: :created
        else
          render_errors json: @rule.errors, status: :unprocessable_entity
        end
      end

      def delete_single
        @rule.destroy
      end

      def fetch_list
        @rules = current_user.rules
          .where(group_id: params[:group_id])
          .order(:match)
      end

      private

      def set_rule
        @rule = Rule.find(params[:id])
      end

      def rule_params
        params.require(:rule)
          .permit(:match, :group_id)
          .merge(user_id: current_user.id)
      end
    end
  end
end
