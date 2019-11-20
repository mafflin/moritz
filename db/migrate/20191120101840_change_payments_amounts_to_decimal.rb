class ChangePaymentsAmountsToDecimal < ActiveRecord::Migration[6.0]
  def up
    change_column :payments, :debit, :decimal
    change_column :payments, :credit, :decimal
  end

  def down
    change_column :payments, :debit, :integer
    change_column :payments, :credit, :integer
  end
end
