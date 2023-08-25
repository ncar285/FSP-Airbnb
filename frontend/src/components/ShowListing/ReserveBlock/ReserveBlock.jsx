import './ReactDatesStyles.css'
import './ReserveBlock.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../store/sessionsReducer'
import { selectListing } from '../../../store/listingsReducer'
import { useEffect, useState } from 'react'
import { createBooking } from '../../../store/bookingsReducer'
import { activateRegisterModal } from '../../../store/uiReducer'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { AiOutlinePlus } from "react-icons/ai"
import { BiMinus } from "react-icons/bi"
import { AiFillStar } from "react-icons/ai"
import moment from 'moment'
import { getBookingErrors } from '../../../store/errorsReducer';



const ReserveBlock = ( { listing, count, rating } ) => {

    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser)

    const errors = useSelector(getBookingErrors)
    
    const newBooking = {
        userId: user.id,
        listingId: parseInt(listing.id, 10),
        startDate: null,
        endDate: null,
        guests: 1
    }
    
    
    const [booking, setBooking] = useState(newBooking)
    const [focusedInput, setFocusedInput] = useState(null)
    // console.log(booking)
    
    const handleSubmitBooking = async e  => {
        e.preventDefault();
        if (user){
            // debugger
            let start = booking.startDate.format('YYYY/MM/DD');
            let end = booking.endDate.format('YYYY/MM/DD')
            start = new Date(start);
            end = new Date(end);
            const data = await dispatch(createBooking({userId: user.id, listingId: parseInt(listing.id, 10), startDate: start, endDate: end, guests: booking.guests  }))
            console.log(data,"hello")
            // if (data.){
            //     debugger
            // }
        } else {
            dispatch(activateRegisterModal)
        }
    }

    const [maxGuests, setMaxGuest] = useState(false)
    const [minGuests, setMinGuest] = useState(true)

    useEffect((()=>{
        if (booking.guests === listing.guests){
            setMaxGuest(true)
        } else if ((booking.guests === 1)){
            setMinGuest(true)
        } else {
            setMinGuest(false)
            setMaxGuest(false)
        }
    }),[booking.guests])

    // const isDayBlocked = momentDate => {
    //     if (momentDate.format('ddd') === 'Mon' && ['Jul', 'Aug'].includes(momentDate.format('MMM'))) return true
    //     if(this.state.disabledDates.some(day2 => isSameDay(day1, day2))) return true
    //     return false
    // }
    // momentDate => momentDate.format('d') === '0' && ['6','7'].includes(momentDate.format('M'))

    const incrementGuests = () => (booking.guests === listing.guests) ? null : setBooking({ ...booking, guests: booking.guests + 1 })
    const decrementGuests = () => (booking.guests === 1) ? null : setBooking({ ...booking, guests: booking.guests - 1 })

    return (
        <div className='booking-block'>
            <div className='pricing-header'>
                <div id="price-val">${listing.price}</div>
                <div>night</div>
            </div>
            <div className='booking-subheading'>
                <div className='booking-star'><AiFillStar/></div>
                <div>{rating}</div>
                <div>(dot)</div>
                <a href="">{count} reviews</a>
            </div>
            <div className='booking-inputs'>
                <div className='calendar-container'>
                    <DateRangePicker
                        startDate={booking.startDate} // momentPropTypes.momentObj or null,
                        startDateId="start_date" // PropTypes.string.isRequired,
                        endDate={booking.endDate} // momentPropTypes.momentObj or null,
                        endDateId="end_date" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => {
                            let newBookingState = {...booking}
                            newBookingState.startDate = startDate;
                            newBookingState.endDate = endDate;
                            setBooking(newBookingState)
                        }} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                        numberOfMonths={1}
                        // isDayBlocked = {momentDate => momentDate.format('d') === 0 }
                        />
                </div>
                <div className='guests-input'>
                    <label>Guests
                        <div class="number-input">
                            <button className="decrement-button" onClick={decrementGuests}><BiMinus/></button>
                            <div id="guests-quantity" >{booking.guests}</div>
                            <button className="increment-button" onClick={incrementGuests}><AiOutlinePlus/></button>
                            {maxGuests &&
                            <div>max guests!</div>}
                        </div>
                    </label>
                </div>
            </div>
            <button className="book-button" onClick={handleSubmitBooking}>
                Check Availability
            </button>

            <div className='booking-errors'>
                {errors &&
                <div>{errors}</div>}

            </div>
        </div>
    )

}

export default ReserveBlock