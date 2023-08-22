import './ReviewForm.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createReview } from '../../store/reviewsReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useSelector } from 'react-redux'

const ReviewForm = ({listingId}) => {

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
            console.log(review)
            dispatch(createReview(review))
        } else {
            setDisplayLoginMessage(true)
        }
    }

    const [body, setBody] = useState('')
    const [cleanliness, setCleanliness] = useState(null)
    const [communication, setCommunication] = useState(null)
    const [checkIn, setCheckIn] = useState(null)
    const [accuracy, setAccuracy] = useState(null)
    const [location, setLocation] = useState(null)
    const [value, setValue] = useState(null)

    return (

        <div className='form-container'>
            <form onSubmit={handleSubmitReview}>
                <div>Leave a review</div>
                <div className='score-inputs'>
                    <div className='cleanliness input'>
                        <div>Cleanliness</div>
                        <div>
                            <input type="radio" name="cleanliness" value={1} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="cleanliness" value={2} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="cleanliness" value={3} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="cleanliness" value={4} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="cleanliness" value={5} onChange={e => setCleanliness(parseInt(e.target.value, 10))}/>
                        </div>
                    </div>
                    <div className='communication input'>
                        <div>communication</div>
                        <div>
                            <input type="radio" name="communication" value={1} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="communication" value={2} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="communication" value={3} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="communication" value={4} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="communication" value={5} onChange={e => setCommunication(parseInt(e.target.value, 10))}/>
                        </div>
                    </div>
                    <div className='checkIn input'>
                        <div>checkIn</div>
                        <div>
                            <input type="radio" name="checkIn" value={1} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="checkIn" value={2} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="checkIn" value={3} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="checkIn" value={4} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="checkIn" value={5} onChange={e => setCheckIn(parseInt(e.target.value, 10))}/>
                        </div>
                    </div>
                     <div className='accuracy input'>
                        <div>accuracy</div>
                        <div>
                            <input type="radio" name="accuracy" value={1} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="accuracy" value={2} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="accuracy" value={3} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="accuracy" value={4} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="accuracy" value={5} onChange={e => setAccuracy(parseInt(e.target.value, 10))}/>
                        </div>
                    </div>
                    <div className='location input'>
                        <div>location</div>
                        <div>
                            <input type="radio" name="location" value={1} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="location" value={2} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="location" value={3} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="location" value={4} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="location" value={5} onChange={e => setLocation(parseInt(e.target.value, 10))}/>
                        </div>
                    </div>
                    <div className='value input'>
                        <div>value</div>
                        <div>
                            <input type="radio" name="value" value={1} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="value" value={2} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="value" value={3} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="value" value={4} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                            <input type="radio" name="value" value={5} onChange={e => setValue(parseInt(e.target.value, 10))}/>
                        </div>
                    </div>
                    <div>
                        <textarea name="body" id="body" cols="30" rows="10" 
                        placeholder='leave your review here'
                        onChange={e => setBody(e.target.value)}></textarea>
                    </div>
                    <div>
                        <button>Submit Review</button>
                    </div>

                  

                </div>

            </form>

            {displayLoginMessage && loginMessage()}
                    

        </div>

    )
}

export default ReviewForm