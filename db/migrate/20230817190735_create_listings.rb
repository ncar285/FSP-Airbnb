class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.references :owner, foreign_key: { to_table: :users }, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.string :address, null: false 
      t.string :postcode, null: false 
      t.decimal :latitude, precision: 9, scale: 6, null: false 
      t.decimal :longitude, precision: 9, scale: 6, null: false 
      t.decimal :price, null: false
      t.integer :guests, null: false
      t.integer :bedrooms, null: false  
      t.integer :beds, null: false 
      t.integer :baths, null: false 
      t.boolean :pets, default: false, null: false

      t.timestamps
    end
    add_index :listings, :title
    add_index :listings, :address, unique: true
    add_index :listings, :price
    add_index :listings, :guests
    add_index :listings, [:latitude, :longitude], unique: true
  end
end