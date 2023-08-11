# Backend Routes

### users
* `GET /api/users/:id`
* `POST /api/users`
* `DELETE /api/users/:id`
* `PATCH /api/users/:id`

### listings
* `GET /api/listings`
* `GET /api/listings/:id`
* `POST /api/listings`
* `PATCH /api/listings/:id`
* `GET /api/listings?location=san_francisco_california&guests=2&start_date=12_3_25&end_date=2_3_25`

### bookings
* (get comes with listing fetch)
* create 
* update
* delete

### amenities
* get - (when creating a listing, shows user what amenities to choose from?)

### listing_amenities
* create
* delete

### reviews
* (get comes with a listing fetch)
* create
* update
* delete

### tags
* get - (when creating a listing, shows user what tags to choose from?)

###(listing_tags)
* (get comes with a listing fetch)
* create
* delete