import { reactDayAdd } from '../../store/bookingsReducer';
import './FlatBookingItem.css'

const FlatBookingItem = ({ booking, mode}) => {

    const startDate = reactDayAdd(booking.startDate);
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });

    const year = startDate.getFullYear();

    const endDate = reactDayAdd(booking.endDate);
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

    const formattedStartDate = `${startDay} ${startMonth}`;
    const formattedEndDate = `${endDay} ${endMonth}`;
    const formattedYear = `${year}`;

    const longAddress = `${booking.address}, ${booking.city}`
    const country = (booking.state === 'California') ? 'United States' : booking.state
    

    return (
        <>
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

                            { mode === 'confirm' &&
                                // <div className='booking-confirm-details'>
                                <>
                                
                                    <div className='BCD-guests'>
                                        <p>Guests:</p>
                                        <p>{booking.guests}</p>
                                    </div>
                                    <div className='BCD-price'>
                                        <p>Total price before tax:</p>
                                        {/* <p>${totalBeforeTax.toLocaleString()}</p> */}
                                    </div>
                                {/* // </div> */}
                                </>
                            }
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

export default FlatBookingItem