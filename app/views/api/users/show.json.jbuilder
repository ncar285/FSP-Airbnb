json.extract! @user, :id, :email,  :firstname, :lastname, :created_at, :updated_at

json.reviews do
    json.array! @user.reviews do |review|
        json.extract! review, :id, :listing_id, :rating, :body
    end
end

json.photo_url @user.photo.attached? ? url_for(@user.photo) :  nil

json.bookings do
    @user.bookings.each do |booking| 
        json.set! booking.id do 
            json.extract! booking, :price, :guests, :start_date, :end_date, :id
            json.extract! booking.listing, :city, :state, :address 
            json.photo_url booking.listing.photos.attached? ? url_for(booking.listing.photos[0]) : nil
            json.owner booking.listing.owner.firstname
            json.listingId booking.listing.id
        end
    end
end


