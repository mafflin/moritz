class Payment < ApplicationRecord
  include GeoTraceable

  belongs_to :user
  belongs_to :location, optional: true

  scope :income, -> { where('credit > 0') }
  scope :expense, -> { where('debit < 0') }

  validates :credit, presence: true
  validates :debit, presence: true
  validates :digest, presence: true, uniqueness: true
  validates :withdrawal, numericality: true

  before_save :round_credit
  before_save :round_debit

  ROUND_TO = 2
  BANKS = {
    db: 'DB',
    n26: 'n26',
    revolut: 'revolut',
  }

  class << self
    def by_year(date)
      where('extract(year from booked_at) = ?', date.year)
    end

    def by_month(date)
      by_year(date)
        .where('extract(month from booked_at) = ?', date.month)
    end

    def by_rule(rule)
      where('concat(beneficiary, details, note) ilike ?', rule.match_string)
    end

    def by_group(group)
      where('concat(beneficiary, details, note) ilike any (array[?])', group.matches)
    end

    def unmatched(user)
      where(
        'concat(beneficiary, details, note) not ilike all (array[?])',
        user.rules.map(&:match_string)
      )
    end
  end

  private

  def round_credit
    self.credit = self.credit.round(ROUND_TO)
  end

  def round_debit
    self.debit = self.debit.round(ROUND_TO)
  end
end
