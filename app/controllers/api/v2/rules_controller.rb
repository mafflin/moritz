module Api::V2
  class RulesController < ApplicationController
    def fetch_list
      @rules = current_user.rules.where(group_id: params[:group_id])
    end
  end
end
