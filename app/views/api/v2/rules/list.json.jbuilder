json.array!(@rules) do |rule|
  json.partial!('rule', rule: rule)
end
