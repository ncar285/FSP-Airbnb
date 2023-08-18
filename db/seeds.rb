# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"


  puts "Destroying tables..."
  User.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('listings')
  ApplicationRecord.connection.reset_pk_sequence!('users')

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

  puts "Creating other users..."
  user = {}
  file = nil
  (1..20).each do |i|
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


  puts "Creating first listing..."
  first_listing = Listing.create!(
  owner_id: 1,
  title: 'Luxury stay in Beverly Hills, California, United States',
  description: 
  "
  This ultra-modern abode is surrounded by nature in 
  coveted Beverly Hills. High ceilings and an abundance of 
  light create an airy atmosphere inside. Multiple crackling 
  fireplaces add a soothing ambiance to the immaculately 
  designed rooms. After a day of sightseeing, mix a drink 
  at the bar before sprawling out with a favorite flick in 
  the cinema room. Plenty of canyon hiking trails await nearby.
  ",
  address: '1100 Brooklawn Dr',
  postcode: '94110',
  latitude: 37.7749,
  longitude: -122.4194,
  price: 4000.00,
  guests: 2,
  bedrooms: 2,
  beds: 2,
  baths: 2,
  pets: true
)

puts "uploading listing's photos..."
base = "https://fairbnb-user-seeds.s3.us-west-1.amazonaws.com/house1"
(1..10).each do |i|
  file = URI.open("#{base}/#{i}.jpg")
  first_listing.photos.attach(io: file, filename: "#{i}.jpg")
end
puts "Done!"