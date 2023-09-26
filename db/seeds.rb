require "open-uri"
require 'aws-sdk-s3'
require 'csv'

#! RESETTING THINGS
puts "Destroying reviews..."
Review.destroy_all
puts "Destroying booking..."
Booking.destroy_all
puts "Destroying listings..."
Listing.destroy_all
puts "Destroying users..."
User.destroy_all

puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('listings')
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('reviews')
ApplicationRecord.connection.reset_pk_sequence!('bookings')

Dir[File.join(Rails.root, "db", "seeds", "*.rb")].sort.each do |seed|
  puts "seeding - #{seed}. loading seeds, for real!"
  load seed
end

