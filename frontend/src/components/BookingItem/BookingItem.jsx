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


    const when = () => {
        const today = new Date();
        const days = (startDate - today)/(1000*60*60*24);
        if (days <= 0 ) return 'Current';
        if (days > 0 && days < 1) return 'Today';
        const weeks = days/7;
        const months = days/30;
        const years = days/365;
        const times = [{year: years}, {month: months}, {week: weeks}, {day: days}]
        const lowestOrderTime = times.filter((timeObj)=>Object.values(timeObj)[0] >= 1)
        const order = Object.keys(lowestOrderTime[0])
        const quant = Math.round(Object.values(lowestOrderTime[0]),1)
        const plural = quant > 1 ? 's' : ''
        return quant + ' ' + order + plural
    }

  
    return (
        <>

            <div className="booking-item">

                <div className='when-message'>{when()}</div>

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