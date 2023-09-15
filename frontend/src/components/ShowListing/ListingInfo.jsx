import './ListingInfo.css'
import placeOffers from '../../assets/place-offers.png'
import lisingInfo from '../../assets/bellow-subheader.png'
import ShowDateRange from '../Calendar/ShowDateRange';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { MdKeyboardArrowRight } from 'react-icons/md'

const ListingInfo = ({ listing, booking, setBooking, duration,  range, setRange }) => {

    const [descriptionModal, setDescriptionModal] = useState(false)
    const revealDescription = () => {
        setDescriptionModal(true)
    }
    const hideDescription = () => {
        setDescriptionModal(false)
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
                <p className='description-preview'>{listing.description}</p>
                <div className='elipses'><p>...</p></div>
                <div className="show-more" onClick={revealDescription}>Show More <MdKeyboardArrowRight className='arrow-more'/></div>



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
                    
                    <ShowDateRange
                    range = {range} setRange = {setRange}
                    duration = {duration} listing={listing} 
                    booking = {booking} setBooking = {setBooking}
                    />
                </div>
            </div>


            {descriptionModal && 
                <div className='basic-modal-background' onClick={hideDescription}>
                    <div className='basic-modal listing-description' onClick={(e) => e.stopPropagation()}>
                        <button className='close-button'onClick={hideDescription}><RxCross2/></button>
                        <div className='description-container'>
                            <p className='header-1'>About this space</p>
                            <p className='long-text listing-description'>{listing.description}</p>
                        </div>
                    </div>
                </div>
            }

        </div>
    )

}

export default ListingInfo