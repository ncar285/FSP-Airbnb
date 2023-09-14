json.extract! listing, :id, :tag_line, :city, :state,  :country, :price, :address

review_ratings = listing.reviews.map{ |review| review.rating }
if review_ratings.count > 0
    score = review_ratings.sum/review_ratings.count
else
    score = 0
end
json.total_rating score.round(2)

json.photo_urls listing.photos.map{|photo| url_for photo}

