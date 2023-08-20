class AddTaglineColumnToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :tag_line, :string
  end
end
