json.extract! @listing, :id, :owner_id, :title, :description, :address, 
            :postcode, :price, :guests, :city, :state, :tag_line,
            :bedrooms, :beds, :baths, :pets, :created_at, :updated_at

# json.photo_url @listing.photos.attached? ? url_for(@listing.photos) :  nil
json.photo_urls @listing.photos.map{|photo| url_for photo}