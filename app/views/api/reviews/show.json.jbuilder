# json.extract! @review, :id, :listing_id, :author_id, :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value, :created_at, :updated_at
json.extract! @review, :id, :booking_id, :author_id, :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value, :rating, :created_at, :updated_at
json.author_firstname @review.author.firstname
json.author_photo_url @review.author.photo.attached? ? url_for(@review.author.photo) : nil