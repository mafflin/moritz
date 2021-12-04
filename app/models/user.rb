class User < ApplicationRecord
  has_many :groups, dependent: :destroy
  has_many :payments, dependent: :destroy
  has_many :rules, dependent: :destroy
  has_one :setting, dependent: :destroy
  has_one_attached :avatar, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
