import './BookingItem.css'
import { useDispatch } from 'react-redux'
import { deleteBooking } from './../../store/bookingsReducer'

const BookingItem = ({ booking, type, setCancelModal, setModifyModal, setModalId ,modalBooking, setModalBooking}) => {

    const dispatch = useDispatch();

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


    const today = new Date()
    var diffDays = startDate.getDate() - today.getDate();
    const units = (diffDays >= 30) ? 'month' : 'days';
    const amount = (diffDays >= 30) ? diffDays/30 : diffDays;
    const plural = (units > 1) ? 's' : '';
    const when = (diffDays <= 0) ? 'Current' : `In ${amount} ${units}${plural}`



        // ! delete actions
        const  handleCancelClick = async () => {
            setCancelModal(true)
        }
    
        const handleDelete = async () => {
            dispatch(deleteBooking(booking.id))
        }
    
    
        // ! update actions
    
        const  handleModifyClick = () => {
            setModifyModal(true)
        }
    
        const  handleUpdate= async() => {
    
            // newBooking = {...booking, 
            //     startDate: newStartDate, 
            //     endDate: newEndDate,
            //     guests: newGuestCount
            // }
            // dispatch(updateBooking(newBoooking))
        }
    
  
    return (
        <>

            <div className="booking-item">

                <div className='when-message'>{when}</div>

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
                        </div>
                    </div>

                    {type === "upcoming" &&

                        <div className='crud-buttons'>
                            <button 
                            className='cancel'
                            onClick={()=>{
                                setModalBooking(booking)
                                setCancelModal(true)}}
                            >cancel</button>
                            <button 
                            className='modify'
                            onClick={()=>{
                                setModalBooking(booking)
                                setModifyModal(true)}}
                            >modify</button>
                        </div>
                    }

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