import './OldBooking.css'
import { useDispatch } from 'react-redux'

const OldBooking = ({ booking }) => {


    const startDate = new Date(booking.startDate);
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
    const startYear = startDate.getFullYear();

    const endDate = new Date(booking.endDate);
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });
    const endYear = endDate.getFullYear();

    const formattedStartDate = `${startDay} ${startMonth} ${startYear}`;
    const formattedEndDate = `${endDay} ${endMonth} ${endYear}`;


    const longAddress = `${booking.address}, ${booking.city}`
    const country = (booking.state === 'California') ? 'United States' : booking.state

    console.log(booking)

  
    return (
        <>
            <div className="obi-wrap">
                <div className='obi-details'>
                    <div className='obi-image'>
                        <img src={booking.photoUrl} alt="" 
                        className='obi-image'/>
                    </div>


                    <div className='booking-details-dates'>
                        <div className='BDD-left'>
                            <p className='BDD-date'>{booking.city}</p>
                            <p className='BDD-date'>{`Hosted by ${booking.owner}`}</p>

                            <p>{`${formattedStartDate} - ${formattedEndDate}`}</p>
                        </div>
                        <div className='BDD-right'>
                            <p className='BDD-address'>{longAddress}</p>
                            <p>{country}</p>
                        </div>
                    </div>

                </div>
               
            </div>
        </>
    )

}

export default OldBooking