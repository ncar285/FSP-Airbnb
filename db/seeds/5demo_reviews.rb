demo_reviews = [
  'We rented this home for our wedding weekend in Yosemite. My friends and I have all traveled quite extensively across the US as well as other countries, and this was in our top 3 favorites. It is absolutely beautiful! All appliances are top of the line, it was SO clean, private, and perfect for family. We plan to make it a yearly vacation now!',
  'This house was perfectly stocked and large enough for our party of 12 to comfortably stay. It is close to the marina and having your own dock is really nice. All of the lake toys were awesome. The power was out for the last almost 24 hours of our stay but there was a generator so we were set. We had a great time and highly recommend this spot!',
  "The views here are captivating. There\’s no reason to leave and then again lots of adventure nearby. This was the perfect Mother\’s Day getaway with enough space to spread out and come together.",
  "My family and I decided to take a little weekend trip together, something we haven\’t done in some time. After a couple weeks of looking and deciding, we finally all agreed on Santosh\’s place. Not only was it fairly priced, well furnished and comfortable, the view of the lake was more than enough to justify the price. Definitely would book again and plan to do so sooner than later.",
  'Would definitely stay again and recommend the Glass House. Wish there was a Washer/Dryer but we made it work. Most comfortable week of sleep I have had in a long time. Bed is so comfy! Breath taking views of the moon at night from bed. Coffee on the upper deck in the a.m starts the day off with a smile. Close to every thing on the lake via boat. Highly recommended!',
  "Beautiful location with outstanding views. The deck was amazing! Loved drinking coffee out there in the mornings watching the deer walk by and the paddle boarders on the lake. The succulent garden is lovely too. The decor is very sweet. Like a step back in time. Mid century modern, so fun! What a relaxing place. My only wish was for a larger and firmer bed. But it wasn\’t a deal breaker.",
  'Even more beautiful then the pictures show. Loved all the MCM decor and little corner of instruments. The back porch for sunsets was perfect. The front landscaping was beautiful. Overall 10/10',
  'We had a great weekend at this special place! The lake views and quiet were amazing and we enjoyed seeing the deer and birds in the backyard. The inside of the home was also really thoughtful and relaxing. We enjoyed hiking on trails around the lake and eating at Kour Thai and Country Kitchen. Jessica was also a very thoughtful and hospitable host. Would definitely recommend!',
  'Sitting in a cedar hot tub, sipping coffee, under a canopy of coastal redwoods. Priceless! \n
  Great place. We had a perfect time.',
  "Wonderful place to stay!! Clean and inviting. No pet odor. Great kitchen. Clean bathrooms. Comfortable beds. We loved Jon\’s house and can\’t wait to come back. Loved how private it was!!",
  'Beautiful view! We thoroughly enjoyed our stay! It is a great place to relax and enjoy some privacy. Our kids had a wonderful time at the brach flying our kites! We loved the hot tub with the incredible view. Jon was a good host, keeping us abreast of anything . \n
  We will definitely stay there again!'
]

weighted_array = [2] * 1 + [3] * 3 + [4] * 7 + [5] * 15
today = Date.today

# Fetch bookings for demo user that are in the past
my_bookings = Booking.where(user_id: 1, end_date: ..today)

my_reviews = my_bookings.map do |booking|
  {
    author_id: 1,
    booking_id: booking.id,
    cleanliness: weighted_array.sample,
    communication: weighted_array.sample,
    check_in: weighted_array.sample,
    accuracy: weighted_array.sample,
    location: weighted_array.sample,
    value: weighted_array.sample,
    body: nil 
  }
end

# Keep only 11 out of 15 past bookings for reviews
while my_reviews.length > 11
  my_reviews.delete_at(rand(0...my_reviews.length))
end

# Assign bodies to reviews
my_reviews.each_with_index do |review, i|
  review[:body] = demo_reviews[i]
end

puts "saving demo user's reviews"

my_reviews.each_with_index do |review, i|
  new_review = Review.new(review)
  new_review.save!
  puts "review ##{i + 1} saved!"
end

puts "Done!"
