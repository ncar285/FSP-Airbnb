#! SEED SOME BOOKINGS FOR DEMIS

current_date = Date.today
user_id = 1

# Initialize the start_date to a few weeks before today
start_date = current_date - 3.weeks

# Array of listing IDs for bookings
listing_ids = [4, 5, 2, 27, 19]

listing_ids.each_with_index do |listing_id, index|
  # Generate random number of days for each booking (between 3 and 7 days)
  duration = rand(3..7)

  # Calculate the end date based on the start date and duration
  end_date = start_date + duration.days

  # Create booking
  Booking.create!(
    user_id: user_id,
    listing_id: listing_id,
    start_date: start_date,
    end_date: end_date,
    guests: rand(1..2) # Randomly set 1 or 2 guests
  )
  puts "booking #{index + 1} done!"

  # Update the start_date for the next booking, ensure no overlaps
  start_date = end_date + rand(1..3).days
end

# Set one booking as current
current_booking = Booking.create!(
  user_id: user_id,
  listing_id: 17,
  start_date: current_date,
  end_date: current_date + 5.days,
  guests: 1
)
puts "current booking done!"