class AddNoteToPayments < ActiveRecord::Migration[6.0]
  def change
    add_column :payments, :note, :string
  end
end
