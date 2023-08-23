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


const findAverageScore = (reviews, category) => {
    const array = reviews.map((review) => review[category])
    const sum = array.reduce((total, current) => total + current, 0);
    return sum/(reviews.length)
}


const Reviews = () => {
    const reviews = useSelector(getListingRevews)


    const count = reviews.length;
    let rating = findAverageScore(reviews, "rating")
    rating = Number(rating.toFixed(2))
    let cleanliness = findAverageScore(reviews, "cleanliness")
    cleanliness = Number(rating.toFixed(1))
    let communication = findAverageScore(reviews, "communication")
    communication = Number(communication.toFixed(1))
    let checkIn = findAverageScore(reviews, "checkIn")
    checkIn = Number(checkIn.toFixed(1))
    let accuracy = findAverageScore(reviews, "accuracy")
    accuracy = Number(accuracy.toFixed(1))
    let location = findAverageScore(reviews, "location")
    location = Number(location.toFixed(1))
    let value = findAverageScore(reviews, "value")
    value = Number(value.toFixed(1))
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
       
        {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}

    </>
    )
}

export default Reviews