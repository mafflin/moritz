class ApplicationController < ActionController::API
  before_action :underscore_params!, :require_login
  helper_method :current_user

  protected

  def current_user
    if user_id = session[:current_user_id]
      @current_user ||= User.find(user_id)
    else
      @current_user = nil
    end
  end

  def require_login
    return if current_user

    session[:current_user_id] = nil
    head :unauthorized
  end

  private

  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end
end
