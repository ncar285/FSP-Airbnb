// import './ReserveBlock.css'
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
// import ConfirmBookingModal from '../BookingItem/ConfirmBookingModal'

const ConfirmBookingModal = ( {booking, listing, duration, setConfirmBooking, setSuccessMessage} ) => {

    const startDate = new Date(booking.startDate);
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });

    const year = startDate.getFullYear();

    const endDate = new Date(booking.endDate);
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

    const formattedStartDate = `${startDay} ${startMonth}`;
    const formattedEndDate = `${endDay} ${endMonth}`;
    const formattedYear = `${year}`;

    const longAddress = `${booking.address}, ${booking.city}`
    const country = (booking.state === 'California') ? 'United States' : booking.state

    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser)
    const errors = useSelector(getBookingErrors)
    // const [open, setOpen] = useState(false)
    // const [confirmBooking, setConfirmBooking] = useState(false)
    // const [successMessage, setSuccessMessage] = useState(false)
    const history = useHistory()
    
    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        let res = { ok: false };
    
        if (user) {
            // res = await dispatch(createBooking(bookingObj));
            const bookingObj = createBookingObj()
            res = await dispatch(createBooking(bookingObj));
        } else {
            await setConfirmBooking(false)
            dispatch(activateRegisterModal());
            requestAnimationFrame(() => {
            document.querySelector('.register-modal').classList.add('show');
            });
            
        }
    
        if (res.ok) {
            setConfirmBooking(false);
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
                history.push('/account');
            }, 1900);
        } else {
            // Handle error
        }
    };


    const createBookingObj = () => {
        return {
            user_id: user.id, 
            listing_id: listing.id,
            start_date: booking.startDate.format("MM/dd/yyyy"),
            end_date: booking.endDate.format("MM/dd/yyyy"),
            guests: booking.guests
        }
    }


    const durationCost = (listing.price*duration);
    const cleaningFee = Math.floor(listing.price * duration * 0.05 
    * (Math.random() * 0.2 + 0.9));
    const fairbnbServiceFee = Math.floor(listing.price * duration * 0.05 
    * (Math.random() * 0.2 + 0.9));
    const totalBeforeTax = Math.floor(durationCost + cleaningFee + fairbnbServiceFee);

    return (
        <div className='basic-modal-background' onClick={()=>setConfirmBooking(false)}>
            <div className='basic-modal' onClick={(e) => e.stopPropagation()}>


                <div className="modify-title">
                    <button className='close-button' onClick={()=>setConfirmBooking(false)}>
                        <RxCross2/>
                    </button>
                    <p className="header-1 modify-cancel">Confirm your reservation details</p>
                </div>

                <div className="flat-booking-item">
                    <div className='booking-details'>
                        <div>{booking.city} {booking.state}</div>
                        <p>{`Entire rental unit hosted by ${booking.owner}`}</p>
                        <div className="booking-item-spacer"></div>

                        <div className='booking-details-dates'>
                            <div className='BDD-left'>
                                <p className='BDD-date'>{formattedStartDate} -</p>
                                <p className='BDD-date'>{formattedEndDate}</p>
                                <p>{formattedYear}</p>
                            </div>
                            <div className='BDD-right'>
                                <p className='BDD-address'>{longAddress}</p>
                                <p>{country}</p>
                                <div className='BCD-guests'>
                                    <p>Guests:</p>
                                    <p>{booking.guests}</p>
                                </div>
                                <div className='BCD-price'>
                                    <p>Total price before tax:</p>
                                    <p>${totalBeforeTax.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='booking-item-image'>
                        <img src={booking.photoUrl} alt="" 
                        className='booking-image'/>
                    </div>
                </div>

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
  
    )
}

export default ConfirmBookingModal