json.extract! @listing, :id, :owner_id, :title, :description, :address, 
            :postcode, :price, :guests, :city, :state, :tag_line,
            :bedrooms, :beds, :baths, :pets, :created_at, :updated_at

json.photo_url @user.photos.attached? ? url_for(@listing.phots) :  nil
