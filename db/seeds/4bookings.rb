#! SEED SOME BOOKINGS FOR DEMIS

# 1
booking = Booking.new
booking.user_id = 1
booking.listing_id = 4
booking.start_date = Date.parse('2023-08-23')
booking.end_date = Date.parse('2023-08-30')
booking.guests = 1
booking.save!
puts "booking 1 done!"

# 2
booking = Booking.new
booking.user_id = 1
booking.listing_id = 5
booking.start_date = Date.parse('2024-01-24')
booking.end_date = Date.parse('2024-01-30')
booking.guests = 1
booking.save!
puts "booking 2 done!"

# 3
booking = Booking.new
booking.user_id = 1
booking.listing_id = 2
booking.start_date = Date.parse('2023-09-01')
booking.end_date = Date.parse('2023-09-10')
booking.guests = 2
booking.save!
puts "booking 3 done!"

# 4
booking = Booking.new
booking.user_id = 1
booking.listing_id = 27
booking.start_date = Date.parse('2023-10-23')
booking.end_date = Date.parse('2023-10-30')
booking.guests = 1
booking.save!
puts "booking 4 done!"

# 5
booking = Booking.new
booking.user_id = 1
booking.listing_id = 19
booking.start_date = Date.parse('2023-09-24')
booking.end_date = Date.parse('2023-09-30')
booking.guests = 1
booking.save!
puts "booking 5 done!"