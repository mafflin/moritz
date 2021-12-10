class Payment < ApplicationRecord
  belongs_to :user

  scope :income, -> { where('credit > 0') }
  scope :expense, -> { where('debit < 0') }

  validates :credit, presence: true, numericality: true
  validates :debit, presence: true, numericality: true
  validates :withdrawal, numericality: true
  validates :digest, presence: true
  validates_uniqueness_of :digest, scope: [:left_neighbor_digest, :user_id]
  validates_uniqueness_of :digest, scope: [:right_neighbor_digest, :user_id]

  before_save :round_credit
  before_save :round_debit

  ROUND_TO = 2
  BANKS = {
    db: 'DB',
    n26: 'n26',
    revolut: 'revolut',
    commerz: 'commerz'
  }.freeze
  DIGEST_ALGORITHM = 'sha256'.freeze
  DIGEST_KEY = 'v1'.freeze
  DIGEST_PARAMS = [
    :booked_at,
    :transaction_type,
    :details,
    :beneficiary,
    :customer_reference,
    :mandate_reference,
    :external_creditor_id,
    :currency,
    :original_debit,
    :original_credit
  ].freeze

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

    def search(query)
      where(
        'concat(beneficiary, details, note, original_debit, original_credit) ilike ?',
        "%#{query}%"
      )
    end

    def generate_digest(attrs)
      values = attrs.values_at(*DIGEST_PARAMS).compact.join

      return nil unless values.present?

      Base64.strict_encode64(
        OpenSSL::HMAC.digest(DIGEST_ALGORITHM, DIGEST_KEY, values)
      )
    end
  end

  private

  def round_credit
    self.credit = credit.round(ROUND_TO)
  end

  def round_debit
    self.debit = debit.round(ROUND_TO)
  end
end
