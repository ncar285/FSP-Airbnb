import "./DeleteReviewModal.css"
import { deactivateDRM } from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"
import ReviewItem from "../ShowListing/Reviews/ReviewItem";
import { getUserReview } from "../../store/reviewsReducer";
import { getDRMState } from "../../store/uiReducer";
import { deleteUserReview } from "../../store/reviewsReducer";

const DeleteReviewModal = () => {

    const review = useSelector(getUserReview)
    const dispatch = useDispatch()
    const active = useSelector(getDRMState)

    if (!active) return null

    const handleExit = e => {
        e.stopPropagation()
        dispatch(deactivateDRM())
    }

    const handleDelete = async e => {
        // e.preventDefault();
        e.stopPropagation()
        // debugger
        dispatch(deleteUserReview(review.id))
        dispatch(deactivateDRM())
    }

    return (
        <div className="DRM-container">
        <div className="DRM-background" onClick={handleExit}>
            
        </div>
            <div className="DRM">
                <div className="DRM-header">
                    <div className="DRM-title-box"> 
                        <h2 className="DRM-title">
                            Are you sure you want to delete this review?
                        </h2>
                    </div>
                </div>
                <div className="DRM-options">
                    {/* <div>{review.id}</div> */}
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={handleExit}>No</button>
                </div>
                <ReviewItem key={review.id} review={review} editMode={false}/> 
            </div>
        </div>
    )
        
}

export default DeleteReviewModal