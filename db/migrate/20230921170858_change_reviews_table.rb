class ChangeReviewsTable < ActiveRecord::Migration[7.0]
  def change
    remove_reference :reviews, :listing, index: true, foreign_key: true
    add_reference :reviews, :booking, index: true, foreign_key: true
  end
end
