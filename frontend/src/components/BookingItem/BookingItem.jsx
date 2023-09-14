import './BookingItem.css'
import {BsTrash3} from "react-icons/bs"
import {FaEdit} from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { deleteBooking } from './../../store/bookingsReducer'

const BookingItem = ({ booking }) => {

    const dispatch = useDispatch();

    const  handleTrashCanClick = async () => {
        dispatch(deleteBooking(booking.id))

    }

    const  handleEditClick = () => {
        return
    }

    // <div>{booking.city}, {booking.state}</div>
    // <div>{booking.startDate} to {booking.endDate}</div>
    // <div>guests: {booking.guests}</div>
    // <div>price: {booking.price}</div>
    // <img src={booking.photoUrl} alt="" className='booking-image'/>
    // <div className='review-crud-buttons'>
    //     <BsTrash3 onClick = {handleTrashCanClick}/>
    //     <FaEdit onClick = {handleEditClick}/>
    // </div>


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


  
    return (
        <>
            <div className="booking-item">
                <div className='booking-details'>

                    <div>{booking.city} {booking.state}</div>
                    <p>Entire rental unit hosted by Amanda</p>
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
                        </div>
                    </div>

                </div>
                <div className='booking-item-image'>
                    <img src={booking.photoUrl} alt="" 
                    className='booking-image'/>
                </div>
               
            </div>
        </>
    )

}

export default BookingItem