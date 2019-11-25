class Rule < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :match, presence: true, uniqueness: {
    scope: [:user_id],
    case_sensitive: false,
  }

  before_save :downcase_match

  def match_string
    "%#{match}%"
  end

  private

  def downcase_match
    self.match.downcase!
  end
end
