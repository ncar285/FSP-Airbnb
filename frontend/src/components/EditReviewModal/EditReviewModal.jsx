import "./EditReviewModal.css"
import { deactivateERM } from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"
// import ReviewItem from "../ShowListing/Reviews/ReviewItem";
import { getUserReview } from "../../store/reviewsReducer";
import { getERMState } from "../../store/uiReducer";
import ReviewForm from "../ReviewForm/ReviewForm";
import { updateReview } from "../../store/reviewsReducer";
import { useEffect, useState } from "react";

const EditReviewModal = () => {

    const myReview = useSelector(getUserReview)
    const [review, setReview] = useState(myReview)
    const active = useSelector(getERMState)
    const dispatch = useDispatch()
    
    
    useEffect(()=>{
        if (myReview){
            setReview(myReview)
        }
    }, [myReview])

    if (!active) return null
    
    // console.log(review)
    // console.log(myReview)

    

    const handleExit = e => {
        e.stopPropagation()
        dispatch(deactivateERM())
    }

    

    const handleEdit = async e => {
        // e.preventDefault();
        e.stopPropagation()
        const newReview = {
            id: review.id,
            listing_id: review.listingId,
            author_id: review.authorId,
            body: review.body,
            cleanliness: review.cleanliness,
            communication: review.communication,
            check_in: review.checkIn,
            accuracy: review.accuracy,
            location: review.location,
            value: review.value
        }
        dispatch(updateReview(newReview))
        dispatch(deactivateERM())
    }



    return (
        <div className="ERM-container">
        <div className="ERM-background" onClick={handleExit}></div>
            <div className="ERM">
                <div className="ERM-header">
                    <div className="ERM-title-box"> 
                        <h2 className="ERM-title">
                            Edit your review
                        </h2>
                    </div>
                </div>
                <div className="ERM-options">
                    <button 
                    onClick={handleEdit}
                    >Save</button>
                </div>
                <ReviewForm key={review.id} review={review} setReview={setReview} editMode={true}/> 
            </div>
        </div>
    )
        
}

export default EditReviewModal