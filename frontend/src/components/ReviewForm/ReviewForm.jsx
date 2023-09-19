import './ReviewForm.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createReview } from '../../store/reviewsReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useSelector } from 'react-redux'
import { getUserReview } from '../../store/reviewsReducer'
import { FaStar } from 'react-icons/fa';
// import { AiOutlineStar } from 'react-icons/fa';
// AiOutlineStar

const ReviewForm = ({editMode = false, review, setReview}) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(getCurrentUser)
    const [displayLoginMessage, setDisplayLoginMessage] = useState(false)

    useEffect(()=>{
        if (loggedInUser){
            setDisplayLoginMessage(false)
        }
    },[loggedInUser]) 

    const loginMessage =() => {
        return (
            <>
                <div>Please Log in first!</div>
            </>
        )
    }

    const handleSubmitReview = async e => {
        e.preventDefault();
        if (loggedInUser){
            dispatch(createReview(review))
        } else {
            setDisplayLoginMessage(true)
        }
    }

    const updateReviewKey = (key, e) => {
        let val
        if (key === "body"){
            val = e.target.value
        }else{
            val = parseInt(e.target.value, 10)
        }
        setReview({ ...review, [key]: val });
    }
    


    return (
        
        <div className='form-container'>
            <form onSubmit={handleSubmitReview}>
                {!editMode &&
                <div className='review-form-header'>Leave a review</div>}
                <div className='score-inputs'>
                    <div className='left-review-categories'>
                        <div className='cleanliness input'>
                            <div className='category'>Cleanliness</div>
                            <div>
                                <input type="radio" checked={review.cleanliness === 1} name="cleanliness" value={1} onChange={e => updateReviewKey("cleanliness", e)}/>
                                <input type="radio" checked={review.cleanliness === 2} name="cleanliness" value={2} onChange={e => updateReviewKey("cleanliness", e)}/>
                                <input type="radio" checked={review.cleanliness === 3} name="cleanliness" value={3} onChange={e => updateReviewKey("cleanliness", e)}/>
                                <input type="radio" checked={review.cleanliness === 4} name="cleanliness" value={4} onChange={e => updateReviewKey("cleanliness", e)}/>
                                <input type="radio" checked={review.cleanliness === 5} name="cleanliness" value={5} onChange={e => updateReviewKey("cleanliness", e)}/>
                            </div>
                        </div>
                        <div className='communication input'>
                            <div className='category'>Communication</div>
                            <div>
                                <input type="radio" checked={review.communication === 1} name="communication" value={1} onChange={e => updateReviewKey("communication", e)}/>
                                <input type="radio" checked={review.communication === 2} name="communication" value={2} onChange={e => updateReviewKey("communication", e)}/>
                                <input type="radio" checked={review.communication === 3} name="communication" value={3} onChange={e => updateReviewKey("communication", e)}/>
                                <input type="radio" checked={review.communication === 4} name="communication" value={4} onChange={e => updateReviewKey("communication", e)}/>
                                <input type="radio" checked={review.communication === 5} name="communication" value={5} onChange={e => updateReviewKey("communication", e)}/>
                            </div >
                        </div>
                        <div className='checkIn input'>
                            <div className='category'>Check-in</div>
                            <div>
                                <input type="radio" checked={review.checkIn === 2} name="check_in" value={2} onChange={e => updateReviewKey("checkIn", e)}/>
                                <input type="radio" checked={review.checkIn === 1} name="check_in" value={1} onChange={e => updateReviewKey("checkIn", e)}/>
                                <input type="radio" checked={review.checkIn === 3} name="check_in" value={3} onChange={e => updateReviewKey("checkIn", e)}/>
                                <input type="radio" checked={review.checkIn === 4} name="check_in" value={4} onChange={e => updateReviewKey("checkIn", e)}/>
                                <input type="radio" checked={review.checkIn === 5} name="check_in" value={5} onChange={e => updateReviewKey("checkIn", e)}/>
                            </div>
                        </div>
                    </div>

                    <div className="right-review-categories">

                        <div className='accuracy input'>
                            <div className='category'>Accuracy</div>
                            <div>
                                <input type="radio" checked={review.accuracy === 1} name="accuracy" value={1} onChange={e => updateReviewKey("accuracy", e)}/>
                                <input type="radio" checked={review.accuracy === 2} name="accuracy" value={2} onChange={e => updateReviewKey("accuracy", e)}/>
                                <input type="radio" checked={review.accuracy === 3} name="accuracy" value={3} onChange={e => updateReviewKey("accuracy", e)}/>
                                <input type="radio" checked={review.accuracy === 4} name="accuracy" value={4} onChange={e => updateReviewKey("accuracy", e)}/>
                                <input type="radio" checked={review.accuracy === 5} name="accuracy" value={5} onChange={e => updateReviewKey("accuracy", e)}/>
                            </div>
                        </div>
                        <div className='location input'>
                            <div className='category'>Location</div>
                            <div>
                                <input type="radio" checked={review.location === 1} name="location" value={1} onChange={e => updateReviewKey("location", e)}/>
                                <input type="radio" checked={review.location === 2} name="location" value={2} onChange={e => updateReviewKey("location", e)}/>
                                <input type="radio" checked={review.location === 3} name="location" value={3} onChange={e => updateReviewKey("location", e)}/>
                                <input type="radio" checked={review.location === 4} name="location" value={4} onChange={e => updateReviewKey("location", e)}/>
                                <input type="radio" checked={review.location === 5} name="location" value={5} onChange={e => updateReviewKey("location", e)}/>
                            </div>
                        </div>
                        <div className='value input'>
                            <div className='category'>Value</div>
                            <div>
                                <input type="radio" checked={review.value === 1} name="value" value={1} onChange={e => updateReviewKey("value", e)}/>
                                <input type="radio" checked={review.value === 2} name="value" value={2} onChange={e => updateReviewKey("value", e)}/>
                                <input type="radio" checked={review.value === 3} name="value" value={3} onChange={e => updateReviewKey("value", e)}/>
                                <input type="radio" checked={review.value === 4} name="value" value={4} onChange={e => updateReviewKey("value", e)}/>
                                <input type="radio" checked={review.value === 5} name="value" value={5} onChange={e => updateReviewKey("value", e)}/>
                            </div>
                        </div>


                    </div>

                </div>

                <div>
                    <textarea name="body" id="body" cols="30" rows="10" 
                    value = { editMode ? review.body : null}
                    placeholder= { editMode ? null : "leave your review here" }
            
                    onChange={e => updateReviewKey("body", e)}></textarea>
                </div>
                <div>
                    { !editMode &&
                    <button>Submit Review</button>}
                </div>

                  


            </form>

            {displayLoginMessage && loginMessage()}
                    

        </div>

    )
}

export default ReviewForm