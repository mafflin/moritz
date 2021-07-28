class AddWithdrawalToPayments < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :withdrawal, :decimal, default: 0
  end
end
