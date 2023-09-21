json.extract! @listing, :id, :owner_id, :title, :description, :address, 
            :postcode, :price, :guests, :city, :state, :tag_line,
            :bedrooms, :beds, :baths, :pets, :created_at, :updated_at


json.photo_urls @listing.photos.map{|photo| url_for photo}

owner = @listing.owner

json.owner do
    json.extract! @listing.owner, :firstname, :email
    json.photo_url @listing.owner.photo.attached? ? url_for(@listing.owner.photo) : nil
end

review_list = @listing.reviews

json.reviews do 
    @listing.reviews.each do |review|
        json.set! review.id do 
            json.extract! review, :id, :author_id, :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value, :rating, :created_at, :updated_at
            json.author_firstname review.author.firstname
            json.author_photo_url review.author.photo.attached? ? url_for(review.author.photo) : nil
            json.listing_id review.booking.listing.id
        end
    end
end

# json.owner
#     {
#         json.extract! owner, :firstname, :email
#         json.owner_photo_url owner.photo.attached? ? url_for(owner.photo) :  nil
#     }

