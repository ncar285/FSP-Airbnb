json.extract! listing, :id, :tag_line, :city, :state, :price, :address

review_ratings = listing.reviews.map{ |review| review.rating }
score = review_ratings.sum/review_ratings.count
json.total_rating score.round(2)

json.photo_urls listing.photos.map{|photo| url_for photo}

