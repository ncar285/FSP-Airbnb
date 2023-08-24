json.extract! @user, :id, :email,  :firstname, :lastname, :created_at, :updated_at

json.photo_url @user.photo.attached? ? url_for(@user.photo) :  nil

json.bookings do
    @user.bookings.each do |booking| 
        json.set! booking.id do 
            json.extract! booking, :price, :guests, :start_date, :end_date
            json.extract! booking.listing, :city, :state, :address 
            json.photo_url booking.listing.photos.attached? ? url_for(booking.listing.photos[0]) : nil
        end
    end
end
