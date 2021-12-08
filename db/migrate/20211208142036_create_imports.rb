class CreateImports < ActiveRecord::Migration[6.1]
  def change
    create_table :imports, id: :uuid do |t|
      t.integer :status
      t.integer :payments_total, default: 0
      t.integer :payments_created, default: 0
      t.string :fail_message
      t.belongs_to :user, type: :uuid

      t.timestamps
    end
  end
end
