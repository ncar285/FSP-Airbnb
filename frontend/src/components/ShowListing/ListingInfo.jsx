import './ListingInfo.css'
import placeOffers from '../../assets/place-offers.png'
import lisingInfo from '../../assets/bellow-subheader.png'
// import DateRange from '../Calendar/DateRangeComp';
import { Calendar } from 'react-date-range';
// import DateRangePicker from '../Calendar/DateRangePickerComp';
// import CalendarComp from '../Calendar/CalendarComp';
// import DateRangeComp from '../Calendar/DateRangeComp';
// import DateRangePickerComp from '../Calendar/DateRangeComp';
// import DateRangeReserve from '../Calendar/DateRangeReserve';

const ListingInfo = ({ listing }) => {

    let style = "height: 200px";
    const revealDescription = () => {
        style = "";
    }

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
                {/* <p>dedicated workspace</p>
                <p>{listing.owner.firstname} is a Superhost</p>
                <p>Free cancellation before Sep 7</p> */}
                <img src={lisingInfo} alt="" />
            </div>
            <div className='listing-description'>
                <p style={{style}}>{listing.description}</p>
                {/* <div onClick={revealDescription}>Show More</div> */}
                <a href="">Show More </a>

            </div>
            <div className='listing-amenities'>
                <img src={placeOffers} alt="" />
                {/* <h2>What this place offers</h2>
                <ul>
                    <li>Mountain View</li>
                    <li>Valley view</li>
                    <li>Kitchen</li>
                    <li>Wifi</li>
                    <li>Dedicated workspace</li>
                </ul>
                <button>Show all 43 amenities</button> */}
            </div>
            <div className='listing-calendar' id="listing-calendar">
                <div className='listing-info-calendar'>
                    
                    <Calendar/>
                </div>
            </div>

        </div>
    )

}

export default ListingInfo