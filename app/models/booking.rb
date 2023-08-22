# == Schema Information
#
# Table name: bookings
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  start_date :string           not null
#  end_date   :string           not null
#  guests     :integer          not null
#
class Booking < ApplicationRecord

    belongs_to :renter, 
        class_name: :User

    belongs_to :listing 

    validates [:start_date, :end_date], :valid_booking_dates


    def valid_booking_dates 
        listing = Listing.find_by(id: self.listing_id)
        bookings = listing.bookings 
        
        next_six_months = [Time.now.utc, Time.now.utc+6]

        # bookings = [
        #     {id: 1, user_id: 5, listing_id: 3, 
        #         start_date: 2023-08-22, end_date: 2023-08-29 :guests 4},
        # ]
      
        booking_dates = bookings.map {|booking|,[booking.start_date, booking.end_date]}

        end_dates = booking_dates.map(|pair| pair[1])   # [d,d,d,d]
        start_dates = booking_dates.map(|pair| pair[0]) # [d,d,d,d]
        # booking_dates = [[s,e], [s,e], [s,e]]

        proposed_start = self.start_date;
        proposed_end = self.end_date;

        invalid = false

        start_dates.each_with_index do |date, i|
            if (date > proposed_end)
                if (end_dates[i] > proposed_start)
                    invalid = true
                end
            end
            # i.e. for nearest start date behind to the proposed start:
            # Require proposed start and end to both be later than this booking
        end

        start_dates.each_with_index do |date, i|
            next_booking_start = start_dates[i+1]
            if (next_booking_start > proposed_start)
                if (next_booking_start < proposed_end)
                    invalid = true
                end
            end
            # i.e. for nearest start date in front to the proposed start:
            # Require proposed start and end to both be earlier than this booking
        end


        




    end





end
