class Payment < ApplicationRecord
  belongs_to :user

  scope :income, -> { where('credit > 0') }
  scope :expense, -> { where('debit < 0') }

  validates :digest, presence: true, uniqueness: true

  private

  def self.by_month(date)
    where('extract(month from booked_at) = ?', date.month)
  end

  def self.by_rule(rule)
    where('details ilike :q OR beneficiary ilike :q', q: rule.match_string)
  end

  def self.by_group(group)
    where(
      'details ilike any (array[:q]) OR beneficiary ilike any (array[:q])',
      q: group.rules.map(&:match_string)
    )
  end
end
