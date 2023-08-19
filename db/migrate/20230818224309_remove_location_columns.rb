class RemoveLocationColumns < ActiveRecord::Migration[7.0]
  def change
    remove_column :listings, :latitude
    remove_column :listings, :longitude
  end
end
