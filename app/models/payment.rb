class Payment < ApplicationRecord
  belongs_to :user
  belongs_to :location, optional: true

  scope :income, -> { where('credit > 0') }
  scope :expense, -> { where('debit < 0') }

  validates :digest, presence: true, uniqueness: true
  validates :withdrawal, numericality: true

  # TODO: move to DB.
  GEOTRACEABLE_TYPES = [
    'Debit Card Payment',
    'MasterCard Payment',
  ]
  # TODO: move to DB.
  NON_GEOTRACEABLE_MATCH = [
    'account statement',
    'amzn',
    'amazon',
    'google',
    'income',
    'onlin',
    'paypal',
  ]
  BANKS = {
    db: 'DB',
    n26: 'n26',
  }
  QUERY_SEPARATOR = '+'

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

  def geo_traceable?
    GEOTRACEABLE_TYPES.include?(transaction_type) && !NON_GEOTRACEABLE_MATCH.any? do |word|
      [beneficiary, details].join.downcase.include?(word)
    end
  end

  def geo_query
    return unless geo_traceable?

    @geo_query ||= case bank
    when Payment::BANKS[:n26]
      beneficiary
    when Payment::BANKS[:db]
      details
    end

    @geo_query&.downcase
      .gsub(/[^A-Za-z]/, ' ')
      .split(' ')
      .join(QUERY_SEPARATOR)
  end
end
