module Api::V1
  class RulesController < ApplicationController
    before_action :set_rule, only: [:show, :update, :destroy]

    # GET /rules
    def index
      @rules = current_user.rules
    end

    # GET /users/1
    def show
    end

    # POST /rules
    def create
      @rule = Rule.new(rule_params)

      if @rule.save
        head :created
      else
        render json: @rule.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /rules/1
    def update
      if @rule.update(rule_params)
        render :show
      else
        render json: @rule.errors, status: :unprocessable_entity
      end
    end

    # DELETE /rules/1
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
