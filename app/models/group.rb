class Group < ApplicationRecord
  belongs_to :user
  has_many :recipients

  validates :name, presence: true, uniqueness: {
    scope: [:user_id]
  }
end
