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

const ReviewForm = ({listingId, editMode=false}) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(getCurrentUser)
    const [displayLoginMessage, setDisplayLoginMessage] = useState(false)

    const oldReview = useSelector(getUserReview)
    
    const oldBody = oldReview?.body ? oldReview.body : null
    const oldCleanliness = oldReview?.cleanliness ? oldReview.cleanliness : null
    const oldCommunication = oldReview?.communication ? oldReview.communication : null
    const oldCheckIn = oldReview?.checkIn ? oldReview.checkIn : null
    const oldAccuracy = oldReview?.accuracy ? oldReview.accuracy : null
    const oldLocation = oldReview?.location ? oldReview.location : null
    const oldValue = oldReview?.value ? oldReview.value : null
 
    const [body, setBody] = useState(oldBody || null)
    const [cleanliness, setCleanliness] = useState(oldCleanliness || null)
    const [communication, setCommunication] = useState(oldCommunication || null)
    const [checkIn, setCheckIn] = useState(oldCheckIn || null)
    const [accuracy, setAccuracy] = useState(oldAccuracy || null)
    const [location, setLocation] = useState(oldLocation || null)
    const [value, setValue] = useState(oldValue || null)

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
            const review = {
                listing_id: listingId,
                author_id: loggedInUser.id,
                body,
                cleanliness,
                communication,
                check_in: checkIn,
                accuracy,
                location,
                value
            }
            dispatch(createReview(review))
            window.location.reload();
        } else {
            setDisplayLoginMessage(true)
        }
    }

    // console.log(valuePlaceholder)

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
                                <input type="radio" checked={cleanliness === 1} name="cleanliness" value={1} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={cleanliness === 2} name="cleanliness" value={2} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={cleanliness === 3} name="cleanliness" value={3} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={cleanliness === 4} name="cleanliness" value={4} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={cleanliness === 5} name="cleanliness" value={5} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                            </div>
                        </div>
                        <div className='communication input'>
                            <div className='category'>Communication</div>
                            <div>
                                <input type="radio" checked={communication === 1} name="communication" value={1} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={communication === 2} name="communication" value={2} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={communication === 3} name="communication" value={3} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={communication === 4} name="communication" value={4} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={communication === 5} name="communication" value={5} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                            </div >
                        </div>
                        <div className='checkIn input'>
                            <div className='category'>Check-in</div>
                            <div>
                                <input type="radio" checked={checkIn === 1} name="checkIn" value={1} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={checkIn === 2} name="checkIn" value={2} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={checkIn === 3} name="checkIn" value={3} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={checkIn === 4} name="checkIn" value={4} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={checkIn === 5} name="checkIn" value={5} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                            </div>
                        </div>
                    </div>

                    <div className="right-review-categories">

                        <div className='accuracy input'>
                            <div className='category'>Accuracy</div>
                            <div>
                                <input type="radio" checked={accuracy === 1} name="accuracy" value={1} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={accuracy === 2} name="accuracy" value={2} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={accuracy === 3} name="accuracy" value={3} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={accuracy === 4} name="accuracy" value={4} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={accuracy === 5} name="accuracy" value={5} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                            </div>
                        </div>
                        <div className='location input'>
                            <div className='category'>Location</div>
                            <div>
                                <input type="radio" checked={location === 1} name="location" value={1} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={location === 2} name="location" value={2} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={location === 3} name="location" value={3} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={location === 4} name="location" value={4} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={location === 5} name="location" value={5} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                            </div>
                        </div>
                        <div className='value input'>
                            <div className='category'>Value</div>
                            <div>
                                <input type="radio" checked={value === 1} name="value" value={1} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={value === 2} name="value" value={2} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={value === 3} name="value" value={3} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={value === 4} name="value" value={4} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                                <input type="radio" checked={value === 5} name="value" value={5} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                            </div>
                        </div>


                    </div>

                </div>

                <div>
                    <textarea name="body" id="body" cols="30" rows="10" 
                    value = { editMode ? body : null}
                    placeholder= { editMode ? null : "leave your review here" }
            
                    onChange={e => setBody(e.target.value)}></textarea>
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