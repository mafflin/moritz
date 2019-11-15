class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    create_table :payments, id: :uuid do |t|
      t.string :beneficiary
      t.string :transaction_type
      t.string :details
      t.string :customer_reference
      t.string :mandate_reference
      t.string :external_creditor_id
      t.string :currency
      t.string :original_debit
      t.string :original_credit
      t.integer :debit, default: 0
      t.integer :credit, default: 0
      t.date :booked_at
      t.belongs_to :user, type: :uuid

      t.timestamps
    end
  end
end
