json.extract! import,
  :id,
  :fail_message,
  :payments_created,
  :payments_total,
  :status

json.created_at import.created_at.to_formatted_s(:short)
json.updated_at import.updated_at.to_formatted_s(:short)
