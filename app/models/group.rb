class Group < ApplicationRecord
  belongs_to :user
  has_many :rules, dependent: :destroy

  validates :name, presence: true, uniqueness: {
    scope: [:user_id]
  }

  def matches
    rules.map(&:match_string)
  end
end
