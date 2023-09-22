import './OldBooking.css'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillStar } from 'react-icons/ai'
// import { AiTwotoneEdit } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import ReviewFormModal from '../ReviewForm/ReviewFormModal'
import { activateERM } from '../../store/uiReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { getBooking } from '../../store/bookingsReducer'

const OldBooking = ({ booking, setSuccessMessage }) => {
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

    const loggedInUser = useSelector(getCurrentUser)
    // console.log(booking.myReview)

    const [review, setReview] = useState(booking.myReview)
    const [openModal, setOpenModal] = useState(false)

    // useEffect(()=>{
    //     if (mode === 'create'){
    //         const initialReview = {
    //             author_id: loggedInUser.id,
    //             booking_id: booking.id,
    //             body: '',
    //             accuracy: null,
    //             cleanliness: null,
    //             communication: null,
    //             check_in: null,
    //             location: null, 
    //             value: null
    //         }
    //         setReview(initialReview)
    //     }
    // },[])

    const initialReview = {
        author_id: loggedInUser.id,
        booking_id: booking.id,
        body: '',
        accuracy: null,
        cleanliness: null,
        communication: null,
        check_in: null,
        location: null, 
        value: null
    }

    // const openReviewModal = () => {
    //     dispatch(activateERM({review, setReview, listingId}))
    // }


    const clickOpenModal = () => {
        const modalInfo = {
            mode: booking.myReview ? 'view' : 'create',
            booking: booking,
            review: booking.myReview ? booking.myReview : initialReview
        }
        sessionStorage.setItem("reviewModal", JSON.stringify(modalInfo))
        setOpenModal(true)
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
                    // onClick={openReviewModal}
                    onClick={clickOpenModal}
                    >

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

            {
                openModal && 
                <ReviewFormModal 
                review = {review} 
                setReview={setReview} 
                listingId = {booking.listingId} 
                setOpenModal={setOpenModal}
                setSuccessMessage={setSuccessMessage}/>
            }


            
        </>
    )

}

export default OldBooking