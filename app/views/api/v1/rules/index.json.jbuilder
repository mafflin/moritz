  json.items @rules do |rule|
    json.partial!('api/v1/rules/rule', rule: rule)
  end
