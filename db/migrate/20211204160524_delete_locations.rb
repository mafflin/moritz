class DeleteLocations < ActiveRecord::Migration[6.1]
  def change
    remove_column :payments, :geocoded
    drop_table :locations
  end
end
