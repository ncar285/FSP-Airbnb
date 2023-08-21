import './ListingInfo.css'

const ListingInfo = ({ listing }) => {

    return (
        <div className='listing-info'>
            <div className='basic-listing-info' id="basic-listing-info">
                <div className='listing-under-heading'>
                    <p className='hosted-by'>Entire home hosted by {listing.owner.firstname}</p>
                    <div className='key-listing-info'>
                        <p>{listing.guests} guests</p>
                        <p className='stats-dot'>{'\u2B24' } </p>
                        <p>{listing.bedrooms} bedroom{listing.bedrooms > 1 ? "s" : ""}</p>
                        <p className='stats-dot'>{'\u2B24' } </p>
                        <p>{listing.beds} bed{listing.beds > 1 ? "s" : ""}</p>
                        <p className='stats-dot'>{'\u2B24' } </p>
                        <p>{listing.baths} bath{listing.baths > 1 ? "s" : ""}</p>
                    </div>
                </div>
                <div className='owners-profile-pic'>
                    <img src={listing.owner.photoUrl} alt="" />
                </div>
            </div>
            <div className='listing-features-list'>
                <p>dedicated workspace</p>
                <p>{listing.owner.firstname} is a Superhost</p>
                <p>Free cancellation before Sep 7</p>
            </div>
            <div className='listing-description'>
                <p>{listing.description}</p>
                <a href="">Show More </a>

            </div>
            <div className='listing-amenities'>
                <h2>What this place offers</h2>
                <ul>
                    <li>Mountain View</li>
                    <li>Valley view</li>
                    <li>Kitchen</li>
                    <li>Wifi</li>
                    <li>Dedicated workspace</li>
                </ul>
                <button>Show all 43 amenities</button>
            </div>
            <div className='listing-calendar' id="listing-calendar">
                <div className='listing-info-calendar'>
                    <p>[calendar goes here]</p>
                </div>

            </div>
        </div>
    )

}

export default ListingInfo