json.array!(@summaries) do |summary|
  json.partial!('summary', summary: summary)
end
