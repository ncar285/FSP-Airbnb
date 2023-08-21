json.extract! @listing, :id, :owner_id, :title, :description, :address, 
            :postcode, :price, :guests, :city, :state, :tag_line,
            :bedrooms, :beds, :baths, :pets, :created_at, :updated_at


json.photo_urls @listing.photos.map{|photo| url_for photo}

owner = @listing.owner

json.owner do
    json.extract! @listing.owner, :firstname, :email
    json.photo_url @listing.owner.photo.attached? ? url_for(@listing.owner.photo) : nil
end

# json.owner
#     {
#         json.extract! owner, :firstname, :email
#         json.owner_photo_url owner.photo.attached? ? url_for(owner.photo) :  nil
#     }

