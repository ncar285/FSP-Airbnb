import './OldBooking.css'
import { useDispatch } from 'react-redux'
import { AiFillStar } from 'react-icons/ai'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useState } from 'react'
import ReviewFormModal from '../ReviewForm/ReviewFormModal'
import { activateERM } from '../../store/uiReducer'

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

    const dispatch = useDispatch();
    
    const longAddress = `${booking.address}, ${booking.city}`
    const country = (booking.state === 'California') ? 'United States' : booking.state
    
    const [viewReview, setViewReview] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    // console.log(booking)

    // console.log(booking.myReview)

    const openReviewModal = () => {
        // setViewReview(booking.myReview)
        const review = viewReview || booking.myReview
        const setReview = setViewReview
        const listingId = booking.listingId
        // debugger
        dispatch(activateERM({review, setReview, listingId}))
    }

  
    return (
        <>
            <div className="obi-wrap">

                <div className='obi-details'>
                    <div className='obi-image'>
                        <img src={booking.photoUrl} alt="" 
                        className='obi-image'/>
                    </div>


                    <div className='obi-details'>
                        <div className='obi-left'>
                            <p id='obi-place'>{booking.city}</p>
                            <p className='obi-hosted-by'>{`Hosted by ${booking.owner}`}</p>

                            <p className='obi-date'>{`${formattedStartDate} - ${formattedEndDate}`}</p>
                        </div>
                    </div>
                    {/* my_review */}

                    <div className='leave-booking-review'
                    onClick={openReviewModal}>

                    {booking.myReview ? 
                        // <AiTwotoneEdit/>
                        <AiFillStar/>
                    : 
                        <>
                            <p>Rate</p>
                        </>

                    }

                    </div>

                </div>
               
            </div>

            {/* {
                openModal && 
                <ReviewFormModal review = {viewReview} setReview={setViewReview} listingId = {booking.listingId}/>
            } */}


            
        </>
    )

}

export default OldBooking