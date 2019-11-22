class Group < ApplicationRecord
  belongs_to :user
  has_many :rules

  validates :name, presence: true, uniqueness: {
    scope: [:user_id]
  }
end
