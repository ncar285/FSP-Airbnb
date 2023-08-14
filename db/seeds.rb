# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ActiveRecord::Base.transaction do 



    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      firstname: 'Demis', 
      lastname: 'Hassabis', 
      email: 'demis@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 

        attributes = {
            firstname: Faker::Name.unique.first_name,
            lastname: Faker::Name.unique.last_name,
            email: Faker::Internet.unique.email,
            password: 'password'
        }
      
      User.create!(attributes) 
    end
  
    puts "Done!"

    
    # User.destroy_all
    # # Listing.destroy_all
    # # Booking.destroy_all
    # # etc

    # # ActiveRecord::Base.connection.reset_pk_sequence!('user')
    # # revise these

    # puts "Creating users..."
    # mike = User.create!(firstname: "Demis", lastname: "Hasibus", email: "demhas@gmail.com", password: "passsword")



    # #! USING FAKER:

    # # attributes = {
    # #     firstname: Faker::Name.first_name,
    # #     lastname: Faker::Name.last_name,
    # #     email: Faker::Internet.email
    # #   }
      
    # # User.create(attributes)

    # #!U
    # User.create(firstname: 'usr', lastname: 'smith', email: 'usr@email.io', password: 'starwars')
    # User.find_by_credentials('usr@email.com', 'starwars')
    # User.find_by_credentials('usr@email.io', 'startrek')
    # User.find_by_credentials('usr', 'starwars')
    # User.find_by_credentials('usr@email.io', 'starwars')

end