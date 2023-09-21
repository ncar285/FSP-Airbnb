# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_21_170858) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "bookings", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "listing_id", null: false
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.integer "guests", null: false
    t.integer "price"
    t.index ["listing_id"], name: "index_bookings_on_listing_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "listings", force: :cascade do |t|
    t.bigint "owner_id", null: false
    t.string "title", null: false
    t.text "description", null: false
    t.string "address", null: false
    t.string "postcode", null: false
    t.integer "price", null: false
    t.integer "guests", null: false
    t.integer "bedrooms", null: false
    t.integer "beds", null: false
    t.integer "baths", null: false
    t.boolean "pets", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "state"
    t.string "city"
    t.string "tag_line"
    t.float "latitude"
    t.float "longitude"
    t.string "country"
    t.index ["address"], name: "index_listings_on_address", unique: true
    t.index ["guests"], name: "index_listings_on_guests"
    t.index ["latitude", "longitude"], name: "index_listings_on_latitude_and_longitude", unique: true
    t.index ["owner_id"], name: "index_listings_on_owner_id"
    t.index ["price"], name: "index_listings_on_price"
    t.index ["title"], name: "index_listings_on_title"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string "body", null: false
    t.integer "cleanliness", null: false
    t.integer "communication", null: false
    t.integer "check_in", null: false
    t.integer "accuracy", null: false
    t.integer "location", null: false
    t.integer "value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "rating"
    t.bigint "booking_id"
    t.index ["booking_id"], name: "index_reviews_on_booking_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "firstname", null: false
    t.string "lastname", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "bookings", "listings"
  add_foreign_key "bookings", "users"
  add_foreign_key "listings", "users", column: "owner_id"
  add_foreign_key "reviews", "bookings"
  add_foreign_key "reviews", "users", column: "author_id"
end
