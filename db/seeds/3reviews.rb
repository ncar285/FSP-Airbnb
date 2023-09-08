require 'csv'

# ! SEED 180 REVIEWS

puts "importing listings.csv..."
csv_text = File.read(Rails.root.join('db', 'reviews.csv'))
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