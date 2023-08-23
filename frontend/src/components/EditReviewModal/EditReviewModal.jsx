import "./EditReviewModal.css"
import { deactivateERM } from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"
// import ReviewItem from "../ShowListing/Reviews/ReviewItem";
import { getUserReview } from "../../store/reviewsReducer";
import { getERMState } from "../../store/uiReducer";
import ReviewForm from "../ReviewForm/ReviewForm";

const EditReviewModal = () => {

    const review = useSelector(getUserReview)
    const dispatch = useDispatch()
    const active = useSelector(getERMState)

    if (!active) return null

    const handleExit = e => {
        e.stopPropagation()
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
                    <button>Save</button>
                </div>
                <ReviewForm key={review.id} review={review} editMode={true}/> 
            </div>
        </div>
    )
        
}

export default EditReviewModal