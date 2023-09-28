# == Schema Information
#
# Table name: bookings
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  start_date :date             not null
#  end_date   :date             not null
#  guests     :integer          not null
#  price      :integer
#
class Booking < ApplicationRecord

    validates :user_id, :listing_id, :start_date, :end_date, :guests, presence: true

    # validate :valid_booking_dates

    # validate :valid_guests

    validates :price, numericality: {greater_than: 0}, allow_nil: true

    before_save :generate_price
    
    belongs_to :renter, 
        class_name: :User,
        foreign_key: :user_id

    belongs_to :listing 

    has_one :review,
        dependent: :destroy


    def valid_booking_dates 
        listing = Listing.find_by(id: listing_id)
        bookings = listing.bookings
        proposed_start = self.start_date
        proposed_end = self.end_date
        bookings.each do |booking|
            if (proposed_start < booking.end_date) && (proposed_end > booking.end_date)
              errors.add(:base, "The booking dates overlap with an existing booking")
              return
            end
            if (proposed_start < booking.end_date) && (proposed_end > booking.start_date)
                errors.add(:base, "The booking dates overlap with an existing booking")
                return
            end
        end
        # end
        if (proposed_start > proposed_end)
            errors.add(:base, "The end date is before the start date")
        end
        if (proposed_start < Date.today)
            errors.add(:base, "The booking is in the past")
        end
    end

    def generate_price 
        stay_length = (self.end_date - self.start_date).to_i
        per_day = self.listing.price
        self.price = stay_length * per_day
    end

    def valid_guests 
        if (self.guests > self.listing.guests )
            errors.add(:base, "The bookng has too many guests")
        end
    end



end
