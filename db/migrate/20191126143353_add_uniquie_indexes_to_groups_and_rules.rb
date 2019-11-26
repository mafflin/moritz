class AddUniquieIndexesToGroupsAndRules < ActiveRecord::Migration[6.0]
  def change
    add_index :groups, [:user_id, :name], unique: true
    add_index :rules, [:user_id, :match], unique: true
  end
end
