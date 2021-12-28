json.extract! payment,
  :id,
  :bank,
  :booked_at,
  :transaction_type,
  :details,
  :beneficiary,
  :customer_reference,
  :mandate_reference,
  :external_creditor_id,
  :currency,
  :note

json.debit payment.debit.to_f
json.credit payment.credit.to_f
json.withdrawal payment.withdrawal.to_f
