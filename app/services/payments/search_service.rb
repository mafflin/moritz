module Payments
  class SearchService < ApplicationService
    def initialize(user:, date: nil, group_id: nil)
      @user = user
      @date = date ? Date.parse(date) : Date.today
      @group = Group.find_by(id: group_id)
    end

    def perform
      relation = @user.payments.by_month(@date)
      relation = relation.by_group(@group) if @group.present?
      relation
    end
  end
end
