json.items @summaries do |summary|
  json.group_id summary[:group_id]
  json.group_name summary[:group_name]
  json.debit summary[:debit]
  json.credit summary[:credit]
end
