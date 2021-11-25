module Payments
  class FetchService < ApplicationService
    DEFAULT_ORDER = 'payments.booked_at DESC, payments.created_at DESC'

    def initialize(user:, date: nil, group_id: nil)
      @user = user
      @group_id = group_id
      @date = date ? Date.parse(date) : Date.today
    end

    def perform
      relation = @user.payments.includes(:location).by_month(@date)

      if @group_id == Group::UNMATCHED_ID
        relation = relation.unmatched(@user)
      elsif group.present?
        relation = relation.by_group(group)
      end

      relation.order(DEFAULT_ORDER)
    end

    private

    def group
      @group ||= @user.groups.find_by(id: @group_id)
    end
  end
end
