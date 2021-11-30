class CreateSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :settings do |t|
      t.boolean :panel_expanded, default: false
      t.boolean :dark_theme, default: false
      t.belongs_to :user, type: :uuid

      t.timestamps
    end
  end
end
