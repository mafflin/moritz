class Location < ApplicationRecord
  belongs_to :user
  has_many :payments

  validates :features, presence: true
  validates :query, presence: true

  def relevant
    features.first
  end
end
