class CreateRecipients < ActiveRecord::Migration[6.0]
  def change
    create_table :recipients, id: :uuid do |t|
      t.string :name
      t.string :match
      t.belongs_to :group, type: :uuid
      t.belongs_to :user, type: :uuid

      t.timestamps
    end
  end
end
