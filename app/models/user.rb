class User < ApplicationRecord
  has_many :groups
  has_many :payments
  has_one_attached :avatar

  validates :name, presence: true, uniqueness: true
end
