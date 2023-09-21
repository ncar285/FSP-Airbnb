# == Schema Information
#
# Table name: reviews
#
#  id            :bigint           not null, primary key
#  listing_id    :bigint           not null
#  author_id     :integer          not null
#  body          :string           not null
#  cleanliness   :integer          not null
#  communication :integer          not null
#  check_in      :integer          not null
#  accuracy      :integer          not null
#  location      :integer          not null
#  value         :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  rating        :float
#
class Review < ApplicationRecord

    validates :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value, :author_id, :booking_id, presence: true

    # validates :author_id, uniqueness: {scope: :listing_id}

    validates :author_id, uniqueness: {scope: :booking_id}

    validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }, allow_nil: true

    before_save :generate_rating
    
    # belongs_to :listing 
    belongs_to :booking

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    def generate_rating
        total = self.cleanliness + self.communication + self.check_in + self.accuracy + self.location + self.value
        rating = total / 6.0;
        self.rating = rating
    end

end
