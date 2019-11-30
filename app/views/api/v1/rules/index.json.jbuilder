  json.items @rules do |rule|
    json.extract! rule, :id, :match
  end
