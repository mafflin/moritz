module Api::V2
  class UsersController < ApplicationController
    skip_before_action :require_login, only: [:list]
    before_action :set_user, only: [:show_current]

    def list
      @users = Users::SearchService.new.perform
    end

    def show_current
    end

    private

    def set_user
      @user = current_user
    end
  end
end
