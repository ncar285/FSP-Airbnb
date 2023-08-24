import './BookingItem.css'
const BookingItem = ({ booking }) => {

    console.log(booking)
    return (
        <>
        {/* <div className='bookings-container'> */}
            <div className="booking-item">
                <div>Trip to {booking.city}, {booking.state}</div>
                <div>{booking.startDate} to {booking.endDate}</div>
                <div>guests: {booking.guests}</div>
                <div>price: {booking.price}</div>
                <img src={booking.photoUrl} alt="" className='booking-image'/>
            </div>
        {/* </div> */}
        </>
    )

}

export default BookingItem