@listings.each do |listing| 
    json.set! listing.id do 
        json.partial! 'listingMarker', listing: listing
    end
end
