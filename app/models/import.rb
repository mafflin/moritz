class Import < ApplicationRecord
  belongs_to :user

  enum status: [
    :pending,
    :finished,
    :failed
  ], _default: :pending

  TIMEOUT = 30.minutes
  DISPLAYED_HISTORY_SIZE = 5
end
