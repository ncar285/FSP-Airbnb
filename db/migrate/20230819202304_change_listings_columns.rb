class ChangeListingsColumns < ActiveRecord::Migration[7.0]
  def change
    change_column :listings, :price, :integer
    add_column :listings, :state, :string
    add_column :listings, :city, :string
  end
end
