class Payment < ApplicationRecord
  belongs_to :user

  scope :income, -> { where('credit > 0') }
  scope :expense, -> { where('debit < 0') }

  validates :digest, presence: true, uniqueness: true

  class << self
    def by_month(date)
      where('extract(month from booked_at) = ?', date.month)
    end

    def by_rule(rule)
      where('concat(beneficiary, details) ilike ?', rule.match_string)
    end

    def by_group(group)
      where('concat(beneficiary, details) ilike any (array[?])', group.matches)
    end

    def unmatched(user)
      where(
        'concat(beneficiary, details) not ilike all (array[?])',
        user.rules.map(&:match_string)
      )
    end
  end
end
