class Rule < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :match, presence: true, uniqueness: {
    scope: [:user_id],
    case_sensitive: false
  }

  before_validation :normalize_attributes

  def match_string
    "%#{match}%"
  end

  private

  def normalize_attributes
    self.match = match.strip.downcase
  end
end
