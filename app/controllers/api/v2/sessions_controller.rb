module Api
  module V2
    class SessionsController < ApplicationController
      skip_before_action :require_login

      def create_current
        Sessions::CreateService
          .new(name: params[:name], remote_ip: request.remote_ip, session: session)
          .perform(params[:password])
      rescue Sessions::InvalidCredentialsError => e
        render_errors json: { message: e.message }, status: :unauthorized
      rescue Sessions::TooManyAtemptsError => e
        render_errors json: { message: e.message }, status: :too_many_requests
      end

      def delete_current
        session[:current_user_id] = nil
      end
    end
  end
end
