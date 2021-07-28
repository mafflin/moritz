json.items @payments do |payment|
  json.partial!('payment', payment: payment)

  json.location payment.location&.relevant
end
