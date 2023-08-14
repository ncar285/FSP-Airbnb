# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ActiveRecord::Base.transaction do 

    User.destroy_all
    # Listing.destroy_all
    # Booking.destroy_all
    # etc

    # ActiveRecord::Base.connection.reset_pk_sequence!('user')
    # revise these

    puts "Creating users..."
    mike = User.create!(firstname: "Demis", lastname: "Hasibus", email: "demhas@gmail.com", password: "passsword")

end