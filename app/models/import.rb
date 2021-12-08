class Import < ApplicationRecord
  belongs_to :user

  enum status: [
    :pending,
    :finished,
    :failed
  ], _default: :pending
end
