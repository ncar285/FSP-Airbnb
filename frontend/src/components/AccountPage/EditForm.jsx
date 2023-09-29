import './EditForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useEffect, useState } from 'react'
import { fetchListing, selectListing } from '../../store/listingsReducer'
import DRRSimplified from '../Calendar/DRRSimplified'
import { convertLocalDateToUTC, updateBooking } from '../../store/bookingsReducer'
import { fetchUserShow } from '../../store/usersReducer'
// import success from "../../assets/success.gif"

const EditForm = ( { booking, setSuccessMessage, setModifyModal} ) => {

    
    
    // listing, count, rating, booking, setBooking, duration,  range, setRange 
    const currentUserId = useSelector(getCurrentUser)?.id 
    const listing = useSelector(selectListing(booking.listingId))
    const [duration, setDuration] = useState(null);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    // const [successMessage, setSuccessMessage] = useState(false)

    const [range, setRange] = useState([
        {
            startDate: new Date(booking.startDate), 
            endDate: new Date(booking.endDate),
            key: 'selection'
        }
    ])

    const [updatedBooking, setUpdatedBooking] = useState({
        id: booking.id,
        userId: currentUserId,
        listingId: parseInt(booking.listingId, 10),
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        guests: booking.guests
    })

     

   


    const handleUpdateBooking = async () => {
        setModifyModal(false)

        const updateObj = 
        {...updatedBooking, 
            startDate: updatedBooking.startDate, 
            endDate: updatedBooking.endDate
        }
        const res = await dispatch(updateBooking(updateObj))
        if (res){
            setSuccessMessage(true)
            setTimeout(()=>{
                setSuccessMessage(false)
            }, 1900)
            dispatch(fetchUserShow(currentUserId));
        }
    }


    useEffect(() => {
        dispatch(fetchListing(booking.listingId));
    }, [dispatch, booking]);

    useEffect(() => {
        if (updatedBooking.endDate && updatedBooking.startDate){
            const startDate = new Date(updatedBooking.startDate);
            const endDate = new Date(updatedBooking.endDate);
            const diffTime = endDate - startDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            setDuration(diffDays)
        }
    }, [updatedBooking]);

    
    const durationCost = (listing?.price*duration);
    const cleaningFee = Math.floor(listing?.price * duration * 0.05 
    * (Math.random() * 0.2 + 0.9));
    const fairbnbServiceFee = Math.floor(listing?.price * duration * 0.05 
    * (Math.random() * 0.2 + 0.9));
    const totalBeforeTax = Math.floor(durationCost + cleaningFee + fairbnbServiceFee);

    return (
        
        <div id='edit-form-block'>
            
            <div className='select-dates-focus'>
                { listing && 
                    <DRRSimplified
                        booking = {updatedBooking}
                        setBooking = {setUpdatedBooking}
                        listing = {listing}
                        duration = {duration}
                        open = {open}
                        setOpen = {setOpen}
                        range = {range} setRange = {setRange}
                    />
                }
            </div>

            {
                !open &&

                <>

                <div>This place has a maximum of {listing?.guests} guests</div>
        

                    <div className="price-calcs">
                        <div>
                            <p>{`${listing?.price.toLocaleString()} x ${duration} 
                            night${duration===1 ? '' : 's'}` }</p>
                            <p>Cleaning fee</p>
                            <p>Fairbnb service fee</p>
                        </div>
                        <div className='pc-values'>
                            <p>${durationCost.toLocaleString()}</p>
                            <p>${cleaningFee.toLocaleString()}</p>
                            <p>${fairbnbServiceFee.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="divider-line"/>

                    <div className="price-calcs">
                        <div>
                            <p>Updated total before taxes</p>
                        </div>
                        <div className='pc-values'>
                            <p>${totalBeforeTax.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* <div className='booking-errors'>
                        {errors &&
                        <div>{errors}</div>}
                    </div> */}


                    <button className="airbnb-button" 
                    onClick={handleUpdateBooking}
                    >
                        Update
                    </button>
                </>
             
            }

        {/* </> } */}

        </div>
 
    )

}

export default EditForm