
current_date = Date.today
user_id = 1

start_date = current_date - 53.weeks 


# create 15 bookings in the past
15.times do |index| 
  duration = rand(3..7)
  end_date = start_date + duration.days

  Booking.create!(
    user_id: user_id,
    listing_id: rand(1..30), 
    start_date: start_date,
    end_date: end_date,
    guests: rand(1..2)
  )

  start_date = end_date + rand(1..3).weeks
end

# create current booking
Booking.create!(
  user_id: user_id,
  listing_id: 9,
  start_date: current_date,
  end_date: current_date + 5.days,
  guests: 1
)

# create future bookings
start_date = current_date + 1.week
5.times do
  duration = rand(3..7)
  end_date = start_date + duration.days

  Booking.create!(
    user_id: user_id,
    listing_id: rand(1..30),
    start_date: start_date,
    end_date: end_date,
    guests: rand(1..2)
  )

  start_date = end_date + rand(1..3).weeks
end