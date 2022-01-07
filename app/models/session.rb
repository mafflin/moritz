class Session < ApplicationRecord
  belongs_to :user

  FAIL_WINDOW = 30.minutes
  ALLOWED_FAILED_ATEMPTS = 5

  class << self
    def login_allowed?
      last_atempts = joins(:user)
        .where('sessions.created_at > ?', Time.now - FAIL_WINDOW)
        .last(ALLOWED_FAILED_ATEMPTS)

      last_atempts.size <= ALLOWED_FAILED_ATEMPTS || !last_atempts.all?(&:failed)
    end
  end
end
