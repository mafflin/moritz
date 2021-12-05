class Group < ApplicationRecord
  belongs_to :user
  has_many :rules, dependent: :destroy

  UNMATCHED_ID = 'unmatched'.freeze
  COLORS = %w[
    cyan
    teal
    green
    light-green
    lime
    yellow
    amber
    orange
    brown
    blue-grey
    grey
    deep-orange
    red
    purple
    deep-purple
    blue
    light-blue
    indigo
    pink
  ].freeze

  validates :name, presence: true, uniqueness: {
    scope: [:user_id]
  }
  validates :color, inclusion: {
    in: COLORS,
    allow_blank: true
  }

  def matches
    rules.map(&:match_string)
  end
end
