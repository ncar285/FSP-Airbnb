import './ReviewItem.css'
import { getCurrentUser } from "../../../store/sessionsReducer";
import { useSelector } from "react-redux";
import { BsTrash3 } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { activateERM } from '../../../store/uiReducer';
import { activateDRM } from '../../../store/uiReducer';
import { useDispatch } from 'react-redux';
import { getUserReview } from '../../../store/reviewsReducer'
// import { useSelector } from 'react-redux'
// import { BsTrash3 } from "react-icons/bs"
// import { FaEdit } from "react-icons/fa"



const MyReviewItem = () => {

    const author = review.authorFirstname;
    const dateObject = new Date(review.createdAt);
    const date = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(dateObject);
    const imgUrl = review.authorPhotoUrl
    // const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()

    const handleTrashCanClick = async () => {
        dispatch(activateDRM())
    }
    
    const handleEditClick = async () => {
        dispatch(activateERM())
    }
    
    const review = useSelector(getUserReview)

    if (review){
        return (
            <>
                <div className='review-item my-review'>
                    <div className='user-review-options'>
                        <div className='review-header'>
                            <img className="author-profile" src={imgUrl} alt="" />
                            <div className='name-date'>
                                <div className='reviewer-name'>{author}</div>
                                <div className='review-date'>{date}</div>
                            </div>
                        </div>
                        
                        <div className='review-crud-buttons'>
                            <BsTrash3 onClick = {handleTrashCanClick}/>
                            <FaEdit onClick = {handleEditClick}/>
                        </div>
                        
                    </div>
                    <div className='review-content'>{review.body}</div>
                </div>
            </>
        )
    }else {
        return null;
    }
}

export default MyReviewItem