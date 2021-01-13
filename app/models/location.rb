class Location < ApplicationRecord
  belongs_to :user
  has_many :payments

  validates :query, presence: true
  validates :original_query, presence: true, uniqueness: {
    scope: [:user_id]
  }

  def relevant
    features.first
  end
end
