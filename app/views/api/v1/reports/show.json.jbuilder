json.item do
  json.payments @payments do |payment|
    json.partial!('api/v1/payments/payment', payment: payment)
  end
end
