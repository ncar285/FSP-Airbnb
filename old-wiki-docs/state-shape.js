const state = 
{
	entities: {
		users: {
            1: {
                id: 1,
                firstname: "Nico",
                lastname: "Carlier",
                email: "nico@gmail.com",
                image_url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
            },
            2: {
                id: 2,
                firstname: "Bella",
                lastname: "Paddis",
                email: "bpads888@gmail.com",
                image_url: null
            },
            3: {
                id: 3,
                firstname: "Alexis",
                lastname: "Carlier",
                email: "alexis@gmail.com",
                image_url: "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI="
            }
        },
		lisings: {
            1: {
                id: 1,
                owner_id: 3,
                title: "Scenic forest cabin",
                description: "bla bla bla",
                address: "1 forest road, San Francisco",
                postcode: "99999",
                latitude: 38.8951,
                longitude: -77.0364,
                price: 925.00,
                guests: 4,
                bedrooms: 3,
                beds: 3,
                baths: 2,
                image_urls: ["www.AWS...","www.AWS..."]
            },
            2: {
                id: 2,
                owner_id: 2,
                title: "Beachfront Baller",
                description: "bla beach bla",
                address: "2 Malibu Road, Malibu",
                postcode: "88888",
                latitude: 77.1598,
                longitude: -38.4630,
                price: 2340.00,
                guests: 7,
                bedrooms: 6,
                beds: 6,
                baths: 3,
                image_urls: ["www.AWS...","www.AWS..."]
            },
            3: {
                id: 2,
                owner_id: 1,
                title: "Central Park Apartment",
                description: "bla park bla",
                address: "200 Central Park S #107, New York",
                postcode: "77777",
                latitude: 40.765830,
                longitude: -73.976580,
                price: 2999.99,
                guests: 2,
                bedrooms: 3,
                beds: 1,
                baths: 1,
                image_urls: ["www.AWS...","www.AWS..."]
            }
        },
        bookings: {
            1: {
                user_id: 1,
                listing_id: 3,
                start_date: "2023-08-16T10:20:30Z",
                end_date: "2023-08-23T10:20:30Z",
                guests: 2
            },
            2: {
                user_id: 2,
                listing_id: 3,
                start_date: "2023-08-30T10:20:30Z",
                end_date: "2023-09-06T10:20:30Z",
                guests: 1
            }
        },
        amenites: {
            1: {
                name: "Wifi"
            },
            2: {
                name: "Kitchen"
            },
            3: {
                name: "Hair dryer"
            }
        },
        listing_amenites: {
            1: {
                listing_id: 1,
                amenity_id: 1
            },
            2: {
                listing_id: 1,
                amenity_id: 3
            },
            3: {
                listing_id: 3,
                amenity_id: 1
            },
            4: {
                listing_id: 3,
                amenity_id: 4
            },
            5: {
                listing_id: 3,
                amenity_id: 5
            }
        },
        reviews: {
            1: {
                listing_id: 2,
                author_id: 1,
                body: "great place!",
                cleanliness: 3,
                communication: 4,
                check_in: 3,
                accuracy: 4,
                location: 3,
                value: 4
            },
            2: {
                listing_id: 3,
                author_id: 2,
                body: "yay yay yay!",
                cleanliness: 2,
                communication: 4,
                check_in: 3,
                accuracy: 2,
                location: 4,
                value: 3

            }
        },
        tags: {
            1: {
                id: 1,
                name: "Beachfront"
            },
            2: {
                id: 2,
                name: "Amazing views"
            },
            3: {
                id: 3,
                name: "Amazing pools"
            }
        },
        listing_tags: {
            1: {
                id: 1,
                listing_id: 2,
                tag_id: 1
            },
            2: {
                id: 2,
                listing_id: 2,
                tag_id: 2
            },
            3: {
                id: 3,
                listing_id: 3,
                tag_id: 2
            },
        },
        wishlists: {
            1: {
                owner_id: 1,
                title: "fiji holiday"
            },
            2: {
                owner_id: 2,
                title: "crate-day"
            },
            3: {
                owner_id: 2,
                title: "work trip"
            }
        },
        favorites: {
            1: {
                wishlist_id: 1,
                listing_id: 1
            },
            2: {
                wishlist_id: 1,
                listing_id: 2
            },
            3: {
                wishlist_id: 1,
                listing_id: 3
            },
            4: {
                wishlist_id: 2,
                listing_id: 2
            },
            5: {
                wishlist_id: 3,
                listing_id: 3
            }
        },
	},
	session: {
		currentUser: 1
	},
	ui: {
		modalOpen: true,
        loading: false,
        mapMode: false
	},
	errors: {
		userErrors: [],
		sessionErrors: [],
		postErrors: []
	}
}