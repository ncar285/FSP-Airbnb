# Schema

## users
| column name     | data type | details                   |
|-----------------|-----------|---------------------------|
| id              | bigint    | not null, primary key     |
| firstname       | string    | not null                  |
| lastname        | string    | not null                  |
| email           | string    | not null, indexed, unique |
| password_digest | string    | not null                  |
| session_token   | string    | not null, indexed, unique |
| created_at      | datetime  | not null                  |
| updated_at      | datetime  | not null                  |
* index on `email, unique: true`
* index on `session_token, unique: true`
* `has_many :listings`
* `has_many :bookings`
* `has_many :reviews`
* `has_many :wishlists`

## listings
| column name | data type    | details               |
|-------------|--------------|-----------------------|
| id          | bigint       | not null, primary key |
| owner_id    | bigint       | not null, foreign key |
| title       | string       | not null              |
| description | string       | not null              |
| address     | string       | not null, unique      |
| postcode    | string       | not null              |
| latitude    | decimal(9,6) | not null              |
| longitude   | decimal(9,6) | not null              |
| price       | decimal      | not null              |
| guests      | integer      | not null              |
| bedrooms    | integer      | not null              |
| beds        | integer      | not null              |
| baths       | integer      | not null              |
| created_at  | datetime     | not null              |
| updated_at  | datetime     | not null              |
* `owner_id` references `users`
* index on `owner_id`
* `belongs_to :owner`
* index on `title`
* index on `address`
* index on `price`
* index on `guests`
* index on `address, unique: true`
* index on `[:latitude, longitude], unique: true`
* custom validation on `[address, postcode, latitude, longitude]`
* `has_many :bookings`
* `has_many :amenities`
* `has_many :tags`

## bookings
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | bigint    | not null, primary key |
| user_id     | bigint    | not null, foreign key |
| listing_id  | bigint    | not null, foreign key |
| start_date  | string    | not null              |
| end_date    | string    | not null              |
| guests      | integer   | not null              |
* `user_id` references `users`
* index on `user_id`
* `listing_id` references `listings`
* index on `listing_id`
* `belongs_to :renter`
* `belongs_to :listing`
* custom validation on `[start_date, end_date]`

## amenities
| column name | data type    | details               |
|-------------|--------------|-----------------------|
| id          | bigint       | not null, primary key |
| name        | string       | not null, unique      |
| created_at  | datetime     | not null              |
| updated_at  | datetime     | not null              |
* index on `name, unique: true`
* `has_many :listings`

## listing_amenities
| column name | data type    | details               |
|-------------|--------------|-----------------------|
| id          | bigint       | not null, primary key |
| listing_id  | bigint       | not null, foreign key |
| amenity_id  | bigint       | not null, foreign key |
| created_at  | datetime     | not null              |
| updated_at  | datetime     | not null              |
* `listing_id` references `listings`
* index on `listing_id`
* `amenity_id` references `amenities`
* `belongs_to :listing`
* `belongs_to :amenity`
* index on `[listing_id, amenity_id], unique: true`

## reviews
| column name   | data type    | details               |
|---------------|--------------|-----------------------|
| id            | bigint       | not null, primary key |
| listing_id    | bigint       | not null, foreign key |
| author_id     | bigint       | not null, foreign key |
| body          | string       | not null              |
| cleanliness   | integer      | not null              |
| communication | integer      | not null              |
| check_in      | integer      | not null              |
| accuracy      | integer      | not null              |
| location      | integer      | not null              |
| value         | integer      | not null              |
| created_at    | datetime     | not null              |
| updated_at    | datetime     | not null              |
* `listing_id` references `listings`
* index on `listing_id`
* `author_id` references `authors`
* index on `[listing_id, author_id], unique: true`
* `belongs_to :listing`
* `belong_to :author`

## tags
| column name | data type    | details               |
|-------------|--------------|-----------------------|
| id          | bigint       | not null, primary key |
| name        | string       | not null, unique      |
| created_at  | datetime     | not null              |
| updated_at  | datetime     | not null              |
* index on `name, unique: true`
* `has_many :listings`

## listing_tags
| column name | data type    | details               |
|-------------|--------------|-----------------------|
| id          | bigint       | not null, primary key |
| listing_id  | bigint       | not null, foreign key |
| tag_id      | bigint       | not null, foreign key |
| created_at  | datetime     | not null              |
| updated_at  | datetime     | not null              |
* `listing_id` references `listings`
* `tag_id` references `tags`
* index on `listing_id`
* `belongs_to :listing`
* `belongs_to :tag`
* index on `[listing_id, tag_id], unique: true`

## wishlists
| column name | data type    | details               |
|-------------|--------------|-----------------------|
| id          | bigint       | not null, primary key |
| owner_id    | bigint       | not null, foreign key |
| title       | string       | not null, unique      |
| created_at  | datetime     | not null              |
| updated_at  | datetime     | not null              |
* `owner_id` references `users`
* index on `title, unique: true`
* `has_many :favorites`
* `belongs_to :owner`

## favorites (joins)
| column name | data type    | details               |
|-------------|--------------|-----------------------|
| id          | bigint       | not null, primary key |
| wishlist_id | bigint       | not null, foreign key |
| listing_id  | bigint       | not null, foreign key |
| created_at  | datetime     | not null              |
| updated_at  | datetime     | not null              |
* `wishlist_id` refers to `wishlists`
* `listing_id` refers to `listings`
* index on `listing_id`
* `belongs_to :wishlist`
* index on `[wishlist_id, listing_id], unique: true`