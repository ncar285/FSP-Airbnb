import './Reviews.css'
import { AiFillStar } from "react-icons/ai"
// import { useEffect } from 'react'
// import { getCurrentUser } from '../../store/sessionsReducer'
// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { selectListing } from '../../../store/listingsReducer'
import { getListingRevews } from '../../../store/reviewsReducer';
import ReviewItem from './ReviewItem';
import { useSelector } from 'react-redux';
import { getUserReview } from '../../../store/reviewsReducer';
import { selectListing } from '../../../store/listingsReducer';
import { getCurrentUser } from '../../../store/sessionsReducer';
import { useState } from 'react';
// import MyReviewItem from './MyReviewItem';


const findAverageScore = (reviews, category) => {
    const array = reviews.map((review) => review[category])
    const sum = array.reduce((total, current) => total + current, 0);
    return (category === "rating") ? Number((sum/(reviews.length)).toFixed(2)) : Number((sum/(reviews.length)).toFixed(1))
}



const Reviews = () => {
    const reviews = useSelector(getListingRevews)
    // const listingId = useSelector(selectListing).id
    // const currentUserId = useSelector(getCurrentUser).id
    const userReview = useSelector(getUserReview)

    // console.log(listingId)

    const count = Object.values(reviews).length;
    let rating = findAverageScore(reviews, "rating")
    let cleanliness = findAverageScore(reviews, "cleanliness")
    let communication = findAverageScore(reviews, "communication")
    let checkIn = findAverageScore(reviews, "checkIn")
    let accuracy = findAverageScore(reviews, "accuracy")
    let location = findAverageScore(reviews, "location")
    let value = findAverageScore(reviews, "value")

    const allOtherReviews = () => {
        if (userReview){
            const otherReviews = reviews.filter(review => review.authorId !== userReview?.authorId);
            return otherReviews.map((review) => <ReviewItem key={review.id} review={review} />)
        }else {
            return reviews.map((review) => <ReviewItem key={review.id} review={review} />)
        }
    }

    // const newReview = {
    //     listing_id: currentUserId,
    //     author_id: listingId,
    //     body: null,
    //     cleanliness: null,
    //     communication: null,
    //     check_in: null,
    //     accuracy: null,
    //     location: null,
    //     value: null
    // }

    // const [review, setReview] = useState(newReview)

    return (
    <>
        <div className='review-stats-block'>
            <div>
                <div className='stars'>
                    <AiFillStar/>
                    <p className='rating-number'>{rating}</p>
                    <p className='review-dot'>{'\u2B24' } </p>
                    <p className='count'>{count} Reviews</p>
                </div>
                <div className='review-categories'>
                    <div className='left-scores'>
                        <div className='cleanliness'>
                            <p>Cleanliness</p>
                            <div className='stat-bar'>
                                <div className='outer cleanliness-score'>
                                    <div style={{width: (cleanliness/5)*100}} className='inner cleanliness-score'></div>
                                </div>
                                <p>{cleanliness}</p>
                            </div>
                        </div>
                        <div className='communication'>
                            <p>Communication</p>
                            <div className='stat-bar'>
                                <div className='outer communication-score'>
                                    <div style={{width: (communication/5)*100}} className='inner communication-score'></div>
                                </div>
                                <p>{communication}</p>
                            </div>
                        </div>
                        <div className='check-in'>
                            <p>Check-in</p>
                            <div className='stat-bar'>
                                <div className='outer check-in-score'>
                                    <div style={{width: (checkIn/5)*100}} className='inner check-in-score'></div>
                                </div>
                                <p>{checkIn}</p>
                            </div>
                        </div>
                    </div>
                    <div className='right-scores'>
                        <div className='accuracy'>
                            <p>Accuracy</p>
                            <div className='stat-bar'>
                                <div className='outer accuracy-score'>
                                    <div style={{width: (accuracy/5)*100}} className='inner accuracy-score'></div>
                                </div>
                                <p>{accuracy}</p>
                            </div>
                        </div>
                        <div className='location'>
                            <p>Location</p>
                            <div className='stat-bar'>
                                <div className='outer location-score'>
                                    <div style={{width: (location/5)*100}} className='inner location-score'></div>
                                </div>
                                <p>{location}</p>
                            </div>
                        </div>
                        <div className='value'>
                            <p>location</p>
                            <div className='stat-bar'>
                                <div className='outer value-score'>
                                    <div style={{width: (value/5)*100}} className='inner value-score'></div>
                                </div>
                                <p>{value}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
        {userReview && <ReviewItem key={userReview.id} review={userReview} />}
        {allOtherReviews()}

    </>
    )
}

export default Reviews