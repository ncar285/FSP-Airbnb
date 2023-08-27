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
    
    const timestamp = new Date('09/10/2023');
    const timestamp2 = new Date('09/15/2023'); 
    const momentTimestamp = moment(timestamp);
    const momentTimestamp2 = moment(timestamp2);


    const newBooking = {
        userId: user ? user.id : null,
        listingId: parseInt(listing.id, 10),
        startDate: momentTimestamp,
        endDate: momentTimestamp2,
        guests: 1
    }

    // console.log()
    
    
    const [booking, setBooking] = useState(newBooking)
    const [focusedInput, setFocusedInput] = useState(null)
    
    const handleSubmitBooking = async e  => {
        e.preventDefault();
        if (user){
            let start = booking.startDate.format('YYYY/MM/DD');
            let end = booking.endDate.format('YYYY/MM/DD')
            start = new Date(start);
            end = new Date(end);
            const data = await dispatch(createBooking({userId: user.id, listingId: parseInt(listing.id, 10), startDate: start, endDate: end, guests: booking.guests  }))
            console.log(data,"hello")
        } else {
            dispatch(activateRegisterModal)
        }
    }


    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (booking.endDate && booking.startDate){
            let difference = moment.duration(booking.endDate.diff(booking.startDate));
            setDuration(Math.floor(difference.asDays()));
        }
    }, [booking]);

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
        
        <div id='booking-block'>

            <div className='pricing-header'>
                <div className="price-val">
                    <div id="price-val">${listing.price}</div>
                    <div className="night">night</div>
                </div>
                <div className="right-side">
                    <div className='booking-star'><AiFillStar/></div>
                    <div className="right-rating">{rating}</div>
                    <p className='stats-dot'>{'\u2B24' } </p>
                    
                    <div className="right-reviews">{count} reviews</div>
                </div>
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
                        numberOfMonths={2}
                        // isDayBlocked = {momentDate => momentDate.format('d') === 0 }
                        />
                </div>

                <div className='guests-input'>
                    <label className="guests-title">Guests
                        <div class="number-input">
                            <button id="guest-decrement-button" onClick={decrementGuests}><BiMinus id="decrement-button"/></button>
                            <div id="guests-quantity" >{booking.guests}</div>
                            <button id="guest-increment-button" onClick={incrementGuests}><AiOutlinePlus id="increment-button"/></button>
                            {maxGuests &&
                            <div>max guests!</div>}
                        </div>
                    </label>
                </div>
            </div>
            <button className="book-button" onClick={handleSubmitBooking}>
                Reserve
            </button>
            <div className="wont-be-charged">
                <p>You won't be charged yet</p>
            </div>
            <div className="price-calcs">
                <div>
                    <p>${listing.price} x {duration} nights</p>


                </div>
                <div className="divider-line"/>
                <div>

                </div>

            </div>
            <div className='booking-errors'>
                {errors &&
                <div>{errors}</div>}
            </div>

        </div>
 
    )

}

export default ReserveBlock