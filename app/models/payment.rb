class Payment < ApplicationRecord
  belongs_to :user

  scope :income, -> { where('credit > 0') }
  scope :expense, -> { where('debit < 0') }

  validates :credit, presence: true, numericality: true
  validates :debit, presence: true, numericality: true
  validates :digest, presence: true, uniqueness: true
  validates :withdrawal, numericality: true

  before_validation :generate_digest, on: :create

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

    def match(query)
      where(
        'concat(beneficiary, details, note, original_debit, original_credit) ilike ?',
        "%#{query}%"
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

  def generate_digest
    digest = OpenSSL::HMAC.digest(
      DIGEST_ALGORITHM,
      user_id,
      values_at(*DIGEST_PARAMS).join
    )

    self.digest = Base64.strict_encode64(digest)
  end
end
