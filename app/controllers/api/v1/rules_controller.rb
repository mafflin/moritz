module Api::V1
  class RulesController < ApplicationController
    before_action :set_rule, only: [:show, :update, :destroy]

    def index
      @rules = current_user.rules.where(group_id: params[:group_id])
    end

    def show
    end

    def create
      @rule = Rule.new(rule_params)

      if @rule.save
        render :show, status: :created
      else
        render json: @rule.errors, status: :unprocessable_entity
      end
    end

    def update
      if @rule.update(rule_params)
        render :show
      else
        render json: @rule.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @rule.destroy
    end

    private

    def set_rule
      @rule = Rule.find(params[:id])
    end

    def rule_params
      params.require(:rule)
        .permit(:name, :match, :group_id)
        .merge(user_id: current_user.id)
    end
  end
end
