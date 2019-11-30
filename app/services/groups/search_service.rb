module Groups
  class SearchService < ApplicationService
    def initialize(user:, date: nil)
      @user = user
      @date = date ? Date.parse(date) : Date.today
    end

    def perform
      @user.groups.map do |group|
        {
          id: group.id,
          name: group.name,
          debit: debit(group),
        }
      end
    end

    private

    def debit(group)
      @user.payments.by_month(@date).by_group(group).sum(:debit).to_i
    end
  end
end
