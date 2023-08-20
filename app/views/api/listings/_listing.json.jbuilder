json.extract! listing, :id, :tag_line, :city, :state, :price, :address

json.photo_urls listing.photos.map{|photo| url_for photo}
