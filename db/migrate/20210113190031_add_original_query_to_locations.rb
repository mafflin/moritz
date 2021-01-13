class AddOriginalQueryToLocations < ActiveRecord::Migration[6.1]
  def change
    add_column :locations, :original_query, :string

    add_index :locations, [:user_id, :original_query], unique: true
  end
end
