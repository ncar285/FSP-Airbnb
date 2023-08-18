json.extract! listing, :owner_id, :title, :price

json.photo_urls listing.photos.map{|photo| url_for photo}
