class ApplicationController < ActionController::API
  helper_method :current_user

  protected

  def current_user
    if user_id = request.headers['currentUserId']
      @current_user ||= User.find(user_id)
    else
      @current_user = nil
    end
  end
end
