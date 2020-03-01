module Summaries
  class SearchService < ApplicationService
    def initialize(user:, date: nil)
      @user = user
      @date = date ? Date.parse(date) : Date.today
    end

    def perform
      # TODO: write an okayish query without n+1.
      @user.groups.map do |group|
        payments = @user.payments.by_month(@date).by_group(group)

        {
          group_id: group.id,
          group_name: group.name,
          debit: payments.sum(:debit).to_f,
          credit: payments.sum(:credit).to_f,
        }
      end
    end
  end
end
