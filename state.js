const state = 
{
	entities: {
		users: {
            1: {
                id: 1,
                firstname: "Nico",
                lastname: "Carlier",
                email: "nico@gmail.com"
            },
            2: {
                id: 2,
                firstname: "Bella",
                lastname: "Paddis",
                email: "bpads2069@gmail.com"
            },
            3: {
                id: 3,
                firstname: "Alexis",
                lastname: "Carlier",
                email: "alexis@gmail.com"
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
                baths: 2
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
                baths: 3
            },
            // 
            3: {
                id: 2,
                owner_id: 1,
                title: "Central Park Apartment",
                description: "bla park bla",
                address: "200 Central Park S #107, New York",
                postcode: "10019",
                latitude: 40.765830,
                longitude: -73.976580,
                price: 2999.99,
                guests: 2,
                bedrooms: 3,
                beds: 1,
                baths: 1
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
        favorites: {
            1: {},
            2: {},
            3: {}
        },
        reviews: {
            1: {},
            2: {},
            3: {}
        },
        amenities: {
            1: {},
            2: {},
            3: {}
        },
        listing_amenities: {
            1: {},
            2: {},
            3: {}
        }
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