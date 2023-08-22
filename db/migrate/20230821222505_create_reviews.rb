class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|

      t.references :listing, foreign_key: true, null: false
      t.integer :author_id, null: false
      t.string :body, null: false
      t.integer :cleanliness, null: false
      t.integer :communication, null: false
      t.integer :check_in, null: false
      t.integer :accuracy, null: false
      t.integer :location, null: false
      t.integer :value, null: false
      

      t.timestamps
    end
    add_foreign_key :reviews, :users, column: :author_id
    add_index :reviews, [:listing_id, :author_id], unique: true
  end
end
