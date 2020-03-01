module Payments
  class SearchService < ApplicationService
    def initialize(user:, date: nil, group_id: nil)
      @user = user
      @group_id = group_id
      @date = date ? Date.parse(date) : Date.today
    end

    def perform
      relation = @user.payments.by_month(@date)

      if @group_id == "unmatched"
        relation = relation.unmatched(@user)
      elsif group.present?
        relation = relation.by_group(group)
      end

      relation
    end

    private

    def group
      @group ||= @user.groups.find_by(id: @group_id)
    end
  end
end
