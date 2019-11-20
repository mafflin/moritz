class AddDigestToPayments < ActiveRecord::Migration[6.0]
  def change
    add_column :payments, :digest, :string

    add_index :payments, :digest, unique: true
  end
end
