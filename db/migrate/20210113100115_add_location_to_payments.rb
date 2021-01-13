class AddLocationToPayments < ActiveRecord::Migration[6.1]
  def change
    add_reference :payments, :location, index: true, type: :uuid
    add_column :payments, :geocoded, :boolean, default: false
  end
end
