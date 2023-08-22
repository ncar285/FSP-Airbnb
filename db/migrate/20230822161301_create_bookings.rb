class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|

      t.timestamps

      t.references :user, foreign_key: true, null: false
      t.references :listing, foreign_key: true, null: false
      t.string :start_date, null: false 
      t.string :end_date, null: false
      t.integer :guests, null: false 
    end
  end
end
