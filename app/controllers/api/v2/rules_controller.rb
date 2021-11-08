module Api::V2
  class RulesController < ApplicationController
    def list
      @rules = current_user.rules.where(group_id: params[:group_id])
    end
  end
end
