  json.extract! user, :id, :name
  json.avatar url_for(user.avatar) if user.avatar.attached?
