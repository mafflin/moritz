class Payment < ApplicationRecord
  belongs_to :user

  scope :income, -> { where('credit > 0') }
  scope :expense, -> { where('debit < 0') }

  validates :digest, presence: true, uniqueness: true

  private

  def self.by_month(date)
    where('extract(month from booked_at) = ?', date.month)
  end

  def self.by_recipient(recipient)
    where('details ~ ?', recipient.match_string)
  end

  def self.by_group(group)
    where('details ilike any (array[?])', group.recipients.map(&:match_string))
  end

  def self.unmatched
    where.not('details ilike any (array[?])', Recipient.all.map(&:match_string))
  end
end
