class ListingsAddCoordinates < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :latitude, :float
    add_column :listings, :longitude, :float
    add_column :listings, :country, :string

    add_index :listings, [:latitude, :longitude], unique: true
  end
end
