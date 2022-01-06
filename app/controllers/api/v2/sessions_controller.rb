module Api
  module V2
    class SessionsController < ApplicationController
      skip_before_action :require_login

      def create_current
        user = User.find_by(name: session_params[:name])

        if user&.authenticate(session_params[:password])
          session[:current_user_id] = user.id
        else
          session[:current_user_id] = nil

          head :unauthorized
        end
      end

      def delete_current
        session[:current_user_id] = nil
      end

      private

      def session_params
        params.require(:session)
          .permit(:name, :password)
      end
    end
  end
end
