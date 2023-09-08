require 'csv'

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
