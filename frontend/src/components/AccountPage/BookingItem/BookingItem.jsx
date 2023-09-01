import './BookingItem.css'
import {BsTrash3} from "react-icons/bs"
import {FaEdit} from "react-icons/fa"
import { useDispatch } from 'react-redux'
// import { deleteBooking } from '../../../utils/bookingApiUtils'
import { deleteBooking } from '../../../store/bookingsReducer'

const BookingItem = ({ booking }) => {

    const dispatch = useDispatch();

    const  handleTrashCanClick = async () => {
        dispatch(deleteBooking(booking.id))
    }

    const  handleEditClick = () => {
        return
    }

    return (
        <>
        {/* <div className='bookings-container'> */}
            <div className="booking-item">
                <div>Trip to {booking.city}, {booking.state}</div>
                <div>{booking.startDate} to {booking.endDate}</div>
                <div>guests: {booking.guests}</div>
                <div>price: {booking.price}</div>
                <img src={booking.photoUrl} alt="" className='booking-image'/>
                <div className='review-crud-buttons'>
                    <BsTrash3 onClick = {handleTrashCanClick}/>
                    <FaEdit onClick = {handleEditClick}/>
                </div>
            </div>
        {/* </div> */}
        </>
    )

}

export default BookingItem