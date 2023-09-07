require "open-uri"

require 'aws-sdk-s3'

require 'csv'

#! RESETTING THINGS

puts "Destroying booking..."
Booking.destroy_all
puts "Destroying reviews..."
Review.destroy_all
puts "Destroying listings..."
Listing.destroy_all
puts "Destroying users..."
User.destroy_all

puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('listings')
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('reviews')
ApplicationRecord.connection.reset_pk_sequence!('bookings')



#! CREATE THE DEMO USER

puts "Creating Demo user..."
demis = User.create!(
  firstname: 'Demis', 
  lastname: 'Hassabis', 
  email: 'demis@user.io', 
  password: 'password'
)
file = File.open("app/assets/images/demis.jpg")
demis.photo.attach(io: file, filename: "demis.jpg")
puts "Done!"

#! SEED 100 USERS

puts "Creating other users..."
user = {}
file = nil
(1..100).each do |i|
  attributes = {
    firstname: Faker::Name.unique.first_name,
    lastname: Faker::Name.unique.last_name,
    email: Faker::Internet.unique.email,
    password: 'password'
  }
  user = User.create!(attributes)
  file = File.open("app/assets/images/profile_seeds/p#{i}.png")
  user.photo.attach(io: file, filename: "#{i}p.png")
end

puts "Done!"


#! SEED 30 LISTINGS

# num_listings = 30;
num_listings = 29;

puts "importing listings.csv..."
csv_text = File.read(Rails.root.join('db', 'listings.csv'))
csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
n = 1;
csv.each do |row|
  puts "filling data for listing ##{n}"
  listing = Listing.new
  listing.owner_id = row['owner_id'].to_i
  listing.title = row['title']
  listing.description = row['description']
  listing.price = row['price'].to_i
  listing.state = row['state']
  listing.city = row['city']
  listing.address = row['address']
  listing.postcode = row['postcode']
  listing.guests = row['guests'].to_i
  listing.bedrooms = row['bedrooms'].to_i
  listing.beds = row['beds'].to_i
  listing.baths = row['baths'].to_i
  listing.pets = row['pets'] == 'true'
  listing.tag_line = row['tag_line']
  listing.save!
  puts "listing ##{n} saved!"
  n += 1
  break if n==num_listings+1
end
puts "uploading listing's..."
# photo_counts = [10, 6, 5, 8, 8, 7, 7, 6, 11, 
#   11, 8, 9, 11, 7, 14, 11, 14, 12, 10, 15, 
#   9, 13, 10, 9, 12, 9, 10, 13, 9, 12, 7]

photo_counts = [5, 5, 5, 5, 5, 5, 5, 5, 5, 
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
puts "phhoto array lengths matches listing count: #{(num_listings == photo_counts)}"
listings = Listing.order(:id)
listings.each do |listing|
  n = listing.id
  puts "uploading listing's ##{n}'s photos..."
  base = "https://fairbnb-user-seeds.s3.us-west-1.amazonaws.com/house#{n}"
  photo_count = photo_counts[n-1]
  puts "photo count = #{photo_count}"
  (1..photo_count).each do |i|
    file = URI.open("#{base}/#{i}.jpg")
    puts "path: #{"#{base}/#{i}.jpg"}"
    listing.photos.attach(io: file, filename: "#{i}.jpg")
  end
  puts "listings' photos filled!"
end


# ! SEED 180 REVIEWS

puts "importing listings.csv..."
puts Rails.root.join('db', 'reviews.csv')
csv_text = File.read(Rails.root.join('db', 'reviews.csv'))
# puts csv_text

csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
n = 1
num_reviews = 179
csv.each do |row|
  puts "filling data for review ##{n}"
  review = Review.new
  review.author_id = row['author_id'].to_i
  review.listing_id = row['listing_id'].to_i
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