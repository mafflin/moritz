class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations, id: :uuid do |t|
      t.string :query
      t.jsonb :features
      t.jsonb :point
      t.belongs_to :user, type: :uuid

      t.timestamps
    end
  end
end
