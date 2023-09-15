import './EditForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useEffect, useState } from 'react'
import { createBooking } from '../../store/bookingsReducer'
import { activateRegisterModal } from '../../store/uiReducer'
import { AiFillStar } from "react-icons/ai"
import { getBookingErrors } from '../../store/errorsReducer';
import DateRangeReserve from '../Calendar/DateRangeReserve'
import { fetchListing, selectListing } from '../../store/listingsReducer'

const EditForm = ( { booking } ) => {

    
    
    // listing, count, rating, booking, setBooking, duration,  range, setRange 
    const currentUserId = useSelector(getCurrentUser)?.id 
    const listing = useSelector(selectListing(booking.listingId))
    const [duration, setDuration] = useState(null);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    console.log(listing)

    const [range, setRange] = useState([
        {
            startDate: new Date(), 
            endDate: new Date(),
            key: 'selection'
        }
    ])




    const [updatedBooking, setUpdatedBooking] = useState({
        userId: currentUserId,
        listingId: parseInt(booking.listingId, 10),
        startDate: new Date(),
        endDate: new Date(),
        guests: 1
    })

    useEffect(() => {
        dispatch(fetchListing(booking.listingId));
    }, [dispatch, booking]);

    useEffect(() => {
        if (updatedBooking.endDate && updatedBooking.startDate){
            const startDate = new Date(updatedBooking.startDate);
            const endDate = new Date(updatedBooking.endDate);
            const diffTime = endDate - startDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            setDuration(diffDays)
        }
    }, [updatedBooking]);

    
    const durationCost = (listing?.price*duration);
    const cleaningFee = Math.floor(listing?.price * duration * 0.05 
    * (Math.random() * 0.2 + 0.9));
    const fairbnbServiceFee = Math.floor(listing?.price * duration * 0.05 
    * (Math.random() * 0.2 + 0.9));
    const totalBeforeTax = Math.floor(durationCost + cleaningFee + fairbnbServiceFee);

    return (
        
        <div id='edit-form-block'>

            <div className='select-dates-focus'>


                { listing && 

                    <DateRangeReserve
                        booking = {updatedBooking}
                        setBooking = {setUpdatedBooking}
                        listing = {listing}
                        duration = {duration}
                        open = {open}
                        setOpen = {setOpen}
                        range = {range} setRange = {setRange}
                    />
                }

                <div>This place has a maximum of {listing?.guests} guests</div>

            </div>

            {
                duration &&

                <>
        

                    <div className="price-calcs">
                        <div>
                            <p>{`${listing?.price.toLocaleString()} x ${duration} 
                            night${duration===1 ? '' : 's'}` }</p>
                            <p>Cleaning fee</p>
                            <p>Fairbnb service fee</p>
                        </div>
                        <div className='pc-values'>
                            <p>${durationCost.toLocaleString()}</p>
                            <p>${cleaningFee.toLocaleString()}</p>
                            <p>${fairbnbServiceFee.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="divider-line"/>

                    <div className="price-calcs">
                        <div>
                            <p>Total before taxes</p>
                        </div>
                        <div className='pc-values'>
                            <p>${totalBeforeTax.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* <div className='booking-errors'>
                        {errors &&
                        <div>{errors}</div>}
                    </div> */}


                    <button className="airbnb-button" 
                    // onClick={handleUpdateBooking}
                    >
                        Update
                    </button>
                </>
             
            }

        </div>
 
    )

}

export default EditForm