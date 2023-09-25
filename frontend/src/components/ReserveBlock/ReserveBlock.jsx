import './ReserveBlock.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useEffect, useState } from 'react'
import { createBooking } from '../../store/bookingsReducer'
import { activateRegisterModal } from '../../store/uiReducer'
import { AiFillStar } from "react-icons/ai"
import { getBookingErrors } from '../../store/errorsReducer';
import DateRangeReserve from '../Calendar/DateRangeReserve'
import { RxCross2 } from 'react-icons/rx'
import FlatBookingItem from '../BookingItem/FlatBookingItem'
import success from "../../assets/7efs.gif"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ReserveBlock = ( { listing, count, rating, booking, setBooking, duration,  range, setRange } ) => {

    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser)
    const errors = useSelector(getBookingErrors)
    const [open, setOpen] = useState(false)
    const [confirmBooking, setConfirmBooking] = useState(false)

    const [successMessage, setSuccessMessage] = useState(false)

    const history = useHistory()
    // const newBooking = {
    //     userId: user ? user.id : null,
    //     listingId: parseInt(listing.id, 10),
    //     startDate: null,
    //     endDate: null,
    //     guests: 1
    // }
    
    // const [booking, setBooking] = useState(newBooking)
    
    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        const bookingObj = createBookingObject();
        let res = { ok: false };
    
        if (user) {
            res = await dispatch(createBooking(bookingObj));
        } else {
            dispatch(activateRegisterModal());
        }
    
        if (res.ok) {
            setConfirmBooking(false);
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
                history.push('/account');
            }, 1900);
        } else {
            // Handle error (if needed)
        }
    };


    const createBookingObject = () => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        return {userId: user.id, listingId: parseInt(listing.id, 10), startDate: start, endDate: end, guests: booking.guests }
    }

    const createModalBookingObj = () => {
        // debugger
        return {
            address: listing.address,
            city: listing.city,
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.endDate),
            guests: booking.guests, 
            listingId: listing.id,
            owner: listing.owner.firstname,
            photoUrl: listing.photoUrls[0],
            state: listing.state           
        }
    }

    // const [maxGuests, setMaxGuest] = useState(false)
    // const [minGuests, setMinGuest] = useState(true)

    // useEffect((()=>{
    //     if (booking.guests === listing.guests){
    //         setMaxGuest(true)
    //     } else if ((booking.guests === 1)){
    //         setMinGuest(true)
    //     } else {
    //         setMinGuest(false)
    //         setMaxGuest(false)
    //     }
    // }),[booking.guests])

    // const isDayBlocked = momentDate => {
    //     if (momentDate.format('ddd') === 'Mon' && ['Jul', 'Aug'].includes(momentDate.format('MMM'))) return true
    //     if(this.state.disabledDates.some(day2 => isSameDay(day1, day2))) return true
    //     return false
    // }
    // momentDate => momentDate.format('d') === '0' && ['6','7'].includes(momentDate.format('M'))

    const durationCost = (listing.price*duration);
    const cleaningFee = Math.floor(listing.price * duration * 0.05 
    * (Math.random() * 0.2 + 0.9));
    const fairbnbServiceFee = Math.floor(listing.price * duration * 0.05 
    * (Math.random() * 0.2 + 0.9));
    const totalBeforeTax = Math.floor(durationCost + cleaningFee + fairbnbServiceFee);

    return (

        <>

            {successMessage && 
                <div className="basic-modal-background success-gif" >
                    <div className="basic-modal success-container">
                        <img src={success} alt="" />
                    </div>
                </div>
            }

            {confirmBooking &&
                <div className='basic-modal-background' onClick={()=>setConfirmBooking(false)}>
                    <div className='basic-modal' onClick={(e) => e.stopPropagation()}>
                        <div className="modify-title">
                            <button className='close-button' onClick={()=>setConfirmBooking(false)}>
                                <RxCross2/>
                            </button>
                            <p className="header-1 modify-cancel">Confirm your reservation details</p>
                        </div>
                        <div className='modify-modal-container'>
                            <FlatBookingItem mode='confirm' booking={createModalBookingObj()}/>
                        </div>
                        {/* <div className='booking-confirm-details'>
                            <div className='BCD-guests'>
                                <p>Guests:</p>
                                <p>{booking.guests}</p>
                            </div>
                            <div className='booking-confirm-details'>
                                <p>Total price before tax:</p>
                                <p>${totalBeforeTax.toLocaleString()}</p>
                            </div>
                        </div> */}
                        <div className='confirm-booking-buttons'>
                            <button className="airbnb-button" onClick={handleSubmitBooking}>
                                Confirm & book
                            </button>
                            <button className="airbnb-button" onClick={()=>setConfirmBooking(false)}>
                                Change booking
                            </button>
                        </div>
                    </div>
                </div>
            }

       
        
        <div id='booking-block'>

            <div className='select-dates-focus'>


                <div className='pricing-header'>
                    <div className="price-val">
                        <div id="price-val">${listing.price.toLocaleString()}</div>
                        <div className="night">night</div>
                    </div>
                    <div className="right-side">
                        <div className='booking-star'><AiFillStar/></div>
                        <div className="right-rating">{rating}</div>
                        <p className='stats-dot'>{'\u2B24' } </p>
                        
                        <div className="right-reviews">{count} reviews</div>
                    </div>
                </div>

                <DateRangeReserve
                    booking = {booking}
                    setBooking = {setBooking}
                    listing = {listing}
                    duration = {duration}
                    open = {open}
                    setOpen = {setOpen}
                    range = {range} setRange = {setRange}
                />

                <div>This place has a maximum of {listing.guests} guests</div>

            </div>

            {
                duration ?

                <>
                    <button className="book-button" onClick={()=>setConfirmBooking(true)}>
                        Reserve
                    </button>

                    <div className="wont-be-charged">
                        <p>You won't be charged yet</p>
                    </div>

                    <div className="price-calcs">
                        <div>
                            <p>{`${listing.price.toLocaleString()} x ${duration} 
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

                    <div className='booking-errors'>
                        {errors &&
                        <div>{errors}</div>}
                    </div>
                </>
                : 
                <button className="book-button" onClick={()=>setOpen(true)}>
                    Check Availability
                </button>
            }

        </div>

        </>
 
    )

}

export default ReserveBlock