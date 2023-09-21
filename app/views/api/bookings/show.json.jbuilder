json.extract! @booking, :id, :user_id, :listing_id, :start_date, :end_date, :guests, :price, :created_at, :updated_at
json.review @booking.review

json.listing do 
    json.extract! @booking.listing, :city, :state, :address
    json.photo_url @booking.listing.photos.attached? ? url_for(@booking.listing.photos[0]) : nil
    json.owner do 
        owner = @booking.listing.owner
        json.extract!  owner, :email,  :firstname, :lastname
        json.photo_url owner.photo.attached? ? url_for(owner.photo) :  nil
    end
end
