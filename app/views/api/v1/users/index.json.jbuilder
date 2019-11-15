json.items @users do |user|
  json.partial!('user', user: user)
end
