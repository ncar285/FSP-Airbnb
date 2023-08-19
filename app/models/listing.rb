# == Schema Information
#
# Table name: listings
#
#  id          :bigint           not null, primary key
#  owner_id    :bigint           not null
#  title       :string           not null
#  description :text             not null
#  address     :string           not null
#  postcode    :string           not null
#  latitude    :decimal(9, 6)    not null
#  longitude   :decimal(9, 6)    not null
#  price       :decimal(, )      not null
#  guests      :integer          not null
#  bedrooms    :integer          not null
#  beds        :integer          not null
#  baths       :integer          not null
#  pets        :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Listing < ApplicationRecord

    validates :owner_id, :title, :description, :address, :postcode, :price, :guests, :bedrooms, :beds, :baths, :pets, presence: true
    
    # validates :latitude, uniqueness: { scope: :longitude }

    validates :address, uniqueness: true

    belongs_to :owner,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User

    has_many_attached :photos

    # has_many :bookings
    
    # has_many :reviews

end
