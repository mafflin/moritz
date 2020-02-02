class RenameRecipientsToRules < ActiveRecord::Migration[6.0]
  def change
    rename_table :recipients, :rules
  end
end
