module Api::V2
  class UsersController < ApplicationController
    skip_before_action :require_login, only: [:fetch_list]
    before_action :set_user, only: [:fetch_current]

    def fetch_list
      @users = Users::SearchService.new.perform
    end

    def fetch_current
    end

    private

    def set_user
      @user = current_user
    end
  end
end
