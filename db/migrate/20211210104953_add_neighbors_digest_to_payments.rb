class AddNeighborsDigestToPayments < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :left_neighbor_digest, :string
    add_column :payments, :right_neighbor_digest, :string

    remove_index :payments, :digest, unique: true

    add_index :payments, [:digest, :user_id, :left_neighbor_digest], unique: true
    add_index :payments, [:digest, :user_id, :right_neighbor_digest], unique: true
  end
end
