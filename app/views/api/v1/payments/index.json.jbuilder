  json.items @payments do |payment|
    json.partial!('api/v1/payments/payment', payment: payment)
  end
