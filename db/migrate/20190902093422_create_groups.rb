class CreateGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :groups, id: :uuid do |t|
      t.string :name
      t.belongs_to :user, type: :uuid

      t.timestamps
    end
  end
end
