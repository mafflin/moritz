class RemovePaymentsLocationReference < ActiveRecord::Migration[6.1]
  def change
    remove_reference :payments, :location, index: true, type: :uuid
  end
end
