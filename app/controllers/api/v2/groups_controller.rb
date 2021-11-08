module Api::V2
  class GroupsController < ApplicationController
    def list
      @groups = current_user.groups
    end
  end
end
