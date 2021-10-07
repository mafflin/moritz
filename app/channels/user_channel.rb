class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_from current_user.id
  end

  def unsubscribed
    stop_stream_from current_user.id
  end
end
