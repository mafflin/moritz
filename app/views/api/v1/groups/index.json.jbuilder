json.items @groups do |group|
  json.extract! group, :id, :name
end
