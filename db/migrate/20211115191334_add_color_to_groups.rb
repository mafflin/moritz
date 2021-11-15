class AddColorToGroups < ActiveRecord::Migration[6.1]
  def change
    add_column :groups, :color, :string
  end
end
