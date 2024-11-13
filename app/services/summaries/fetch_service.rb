module Summaries
  class FetchService < ApplicationService
    DEFAULT_MONTH_RANGE = 12
    GROUP_BY_DATE_FORMAT = '%Y-%m'.freeze

    def initialize(user:, date: nil, range: DEFAULT_MONTH_RANGE)
      @user = user
      @date = date ? Date.parse(date) : Date.today
      @date_start = @date.beginning_of_month - range.to_i.months
      @date_end = @date.end_of_month
    end

    def perform
      @user.groups.map do |group|
        payments = @user.payments
          .by_group(group)
          .where('booked_at >= ? AND booked_at <= ?', @date_start, @date_end)
          .order(:booked_at)
          .select([:debit, :credit, :booked_at])
          .group_by { |payment| payment.booked_at.strftime(GROUP_BY_DATE_FORMAT) }

        {
          group_id: group.id,
          dataset: dataset(payments)
        }
      end
    end

    private

    def date_range_month_steps
      (@date_start..@date_end)
        .map { |date| date.strftime(GROUP_BY_DATE_FORMAT) }
        .uniq
    end

    def dataset(payments)
      date_range_month_steps.map do |month|
        items = payments[month] || []

        {
          month:,
          debit: items.sum(&:debit).abs.to_f,
          credit: items.sum(&:credit).abs.to_f
        }
      end
    end
  end
end
