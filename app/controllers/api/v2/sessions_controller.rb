module Api::V2
  class SessionsController < ApplicationController
    skip_before_action :require_login

    def start
      user_id = params[:user_id]

      if User.find(user_id)
        session[:current_user_id] = user_id
      else
        session[:current_user_id] = nil
        head :unauthorized
      end
    end

    def delete
      session[:current_user_id] = nil
    end
  end
end
