require "open-uri"

require 'aws-sdk-s3'

require 'csv'

  # puts "Destroying users..."
  # User.destroy_all
  # puts "Destroying listings..."
  # Listing.destroy_all

  # puts "Resetting primary keys..."
  # ApplicationRecord.connection.reset_pk_sequence!('listings')
  # ApplicationRecord.connection.reset_pk_sequence!('users')

  # puts "Creating Demo user..."
  # demis = User.create!(
  #   firstname: 'Demis', 
  #   lastname: 'Hassabis', 
  #   email: 'demis@user.io', 
  #   password: 'password'
  # )
  # file = File.open("app/assets/images/demis.jpg")
  # demis.photo.attach(io: file, filename: "demis.jpg")
  # puts "Done!"

  # puts "Creating other users..."
  # user = {}
  # file = nil
  # (1..20).each do |i|
  #   attributes = {
  #     firstname: Faker::Name.unique.first_name,
  #     lastname: Faker::Name.unique.last_name,
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }
  #   user = User.create!(attributes)
  #   file = File.open("app/assets/images/profile_seeds/p#{i}.png")
  #   user.photo.attach(io: file, filename: "#{i}p.png")
  # end

  # puts "Done!"


#   puts "Creating first listing..."
#   first_listing = Listing.create!(
#   owner_id: 1,
#   title: 'Luxury stay in Beverly Hills, California, United States',
#   description: 
#   "
#   This ultra-modern abode is surrounded by nature in 
#   coveted Beverly Hills. High ceilings and an abundance of 
#   light create an airy atmosphere inside. Multiple crackling 
#   fireplaces add a soothing ambiance to the immaculately 
#   designed rooms. After a day of sightseeing, mix a drink 
#   at the bar before sprawling out with a favorite flick in 
#   the cinema room. Plenty of canyon hiking trails await nearby.
#   ",
#   address: '1100 Brooklawn Dr',
#   postcode: '94110',
#   latitude: 37.7749,
#   longitude: -122.4194,
#   price: 4000.00,
#   guests: 2,
#   bedrooms: 2,
#   beds: 2,
#   baths: 2,
#   pets: true
# )

# puts "uploading listing's photos..."
# base = "https://fairbnb-user-seeds.s3.us-west-1.amazonaws.com/house1"
# (1..10).each do |i|
#   file = URI.open("#{base}/#{i}.jpg")
#   first_listing.photos.attach(io: file, filename: "#{i}.jpg")
# end
# puts "Done!"

# s3 = Aws::S3::Client.new(region: 'us-west-1')


##! ATTEMPT TO DO T DYNAMICALLY 
# puts "uploading listing's photos..."
# base = "https://fairbnb-user-seeds.s3.us-west-1.amazonaws.com"
# listing = {}
# loop do |i|
#   puts "uploading data for house ##{i}..."
#   begin
#   j=1
#   loop do |j|
#     path = "https://fairbnb-user-seeds.s3.us-west-1.amazonaws.com/house#{i}/#{j}.jpg"
#     file = URI.open("#{path}")
#     listing.photos.attach(io: file, filename: "#{j}.jpg")
#     j ++
#   end
#   i++
#   rescue 
#     break
#   end
# end
# puts "Done!"



# puts "Creating number #{num}"
# first_listing = Listing.create!(
# owner_id: 1,
# title: 'Luxury stay in Beverly Hills, California, United States',
# description: 
# "
# This ultra-modern abode is surrounded by nature in coveted Beverly Hills. High ceilings and an abundance of light create an airy atmosphere inside. Multiple crackling fireplaces add a soothing ambiance to the immaculately designed rooms. After a day of sightseeing, mix a drink at the bar before sprawling out with a favorite flick in the cinema room. Plenty of canyon hiking trails await nearby.
# ",
# address: '1100 Brooklawn Dr',
# postcode: '94110',
# latitude: 37.7749,
# longitude: -122.4194,
# price: 4000.00,
# guests: 2,
# bedrooms: 2,
# beds: 2,
# baths: 2,
# pets: true
# )

num_listings = 30

puts "deleting listings..."
Listing.destroy_all

puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('listings')

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
  listing.address = row['address']
  listing.postcode = row['postcode']
  listing.guests = row['guests'].to_i
  listing.bedrooms = row['bedrooms'].to_i
  listing.beds = row['beds'].to_i
  listing.baths = row['baths'].to_i
  listing.pets = row['pets'] == 'true'
  # print listing.pets
  listing.save!
  puts "listing ##{n} saved!"
  n += 1
  break if n==num_listings+1
end
puts "uploading listing's..."
photo_counts = [10, 6, 4, 8, 8, 7, 7, 6, 11, 
  11, 8, 9, 11, 7, 14, 11, 14, 12, 10, 15, 
  9, 13, 10, 9, 12, 9, 10, 13, 9, 12, 7]
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

