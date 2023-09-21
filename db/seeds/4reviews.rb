require 'csv'

# ! SEED 180 REVIEWS

puts "importing listings.csv..."
csv_text = File.read(Rails.root.join('db', 'reviews.csv'))
csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
n = 1
num_reviews = 179
csv.each do |row|
  
  user_id = row['author_id'].to_i

  # create a corresponding booking
  puts "create a corresponding booking..."
  booking = Booking.create!(
    user_id: user_id,
    listing_id: row['listing_id'].to_i, 
    start_date: Date.today - 53.weeks,
    end_date: Date.today - 52.weeks,
    guests: rand(1..2)
  )
  puts "booking saved"


  puts "filling data for review ##{n}"
  review = Review.new
  review.author_id = user_id
  review.booking_id = booking.id
  review.body = row['body']
  review.cleanliness = row['cleanliness'].to_i
  review.communication = row['cleanliness'].to_i
  review.check_in = row['check_in'].to_i
  review.accuracy = row['accuracy'].to_i
  review.location = row['location'].to_i
  review.value = row['value'].to_i

  review.save!
  puts "review ##{n} saved!"
  n += 1
  break if n==num_reviews+1
end
puts "Done!"