module Sessions
  class CreateService < ApplicationService
    def initialize(name:, remote_ip:, session:)
      @user = User.find_by(name: name)
      @session = session
      @remote_ip = remote_ip
    end

    def perform(password = nil)
      raise InvalidCredentialsError if !@user || !password
      raise TooManyAtemptsError unless @user.sessions.login_allowed?

      authenticated = @user.authenticate(password)
      @user.sessions.create(failed: !authenticated, remote_ip: @remote_ip)

      raise InvalidCredentialsError unless authenticated

      @session[:current_user_id] = authenticated.id
    end
  end

  class InvalidCredentialsError < StandardError
    def message
      'Credentials you have entered are invalid.'
    end
  end

  class TooManyAtemptsError < StandardError
    def message
      "Too many atempts! Try again in #{Session::FAIL_WINDOW_MIN} minutes."
    end
  end
end
