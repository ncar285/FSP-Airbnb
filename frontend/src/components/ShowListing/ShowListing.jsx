import './ShowListing.css'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState} from "react"
import { selectListing, fetchListing, fetchListingScore } from "../../store/listingsReducer"
import PhotoAlbum from '../PhotoAlbum/PhotoAlbum'
import ListingInfo from './ListingInfo'
import ReserveBlock from '../ReserveBlock/ReserveBlock'
import Reviews from '../Reviews/Reviews'
import ReviewForm from '../ReviewForm/ReviewForm'
import { setCurrentReviews } from '../../store/reviewsReducer'
import { getUserReview } from '../../store/reviewsReducer'
// import { selectListing } from '../../store/listingsReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { getListingRevews } from '../../store/reviewsReducer'
import { AiFillStar } from "react-icons/ai"
import { addDays } from 'date-fns'

const ShowListing = () => {
    // const listingId = useSelector(selectListing).id
    const currentUserId = useSelector(getCurrentUser)?.id 
    const { listingId } = useParams();
    const dispatch = useDispatch()
    const listing = useSelector(selectListing(listingId))
    const userReview = useSelector(getUserReview)
    const [duration, setDuration] = useState(null);
    // const user = useSelector(getCurrentUser)

    const [range, setRange] = useState([
        {
            startDate: new Date(), 
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    const newReview = {
        listing_id: parseInt(listingId, 10),
        author_id: currentUserId,
        body: null,
        cleanliness: null,
        communication: null,
        checkIn: null,
        accuracy: null,
        location: null,
        value: null
        // const imgUrl = review.authorPhotoUrl
    }

    const newBooking = {
        userId: currentUserId,
        listingId: parseInt(listingId, 10),
        startDate: null,
        endDate: null,
        guests: 1
    }
    
    const [booking, setBooking] = useState(newBooking)

    
    const [review, setReview] = useState(newReview)
    
    useEffect(() => {
        dispatch(fetchListing(listingId));
    }, [dispatch, listingId]);


    useEffect(() => {
        if (booking.endDate && booking.startDate){
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const diffTime = endDate - startDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            setDuration(diffDays)
        }
    }, [booking]);



    
    useEffect(() => {
        if (listing && listing.reviews) {
            dispatch(setCurrentReviews(listing.reviews));
        }
    }, [listing]);


    useEffect(()=>{
        setReview(review)
    }, [review])

    const findAverageScore = (reviews, category) => {
        const array = reviews.map((review) => review[category])
        const sum = array.reduce((total, current) => total + current, 0);
        return (category === "rating") ? Number((sum/(reviews.length)).toFixed(2)) : Number((sum/(reviews.length)).toFixed(1))
    }

    const reviews = useSelector(getListingRevews)
    const count = Object.values(reviews).length;
    const rating = findAverageScore(reviews, "rating")




    if (!listing) {
        return <div>Loading...</div>;
    }else {
        return (
            <div className="show-container">
                <div className="show-content">
                    <h1>{listing.title}</h1>
                    <div className='show-subheading'>
                        <div className='booking-star'><AiFillStar/></div>
                        <p className='show-rating-subheading'>{rating}</p>
                        <p className='stats-dot'>{'\u2B24' } </p>
                        <p>{count} reviews</p>
                        <p className='stats-dot'>{'\u2B24' } </p>
    
                        <p className='listing-city'> {listing.city}, </p>
                        <p> {listing.state} </p>
                    </div>

                    <PhotoAlbum listing={listing}/>
                    
                    <div className='show-page-contents'>

                        <div className='listing-left-column'>
                            <ListingInfo listing={listing}
                            range = {range} setRange = {setRange}
                            duration = {duration} setDuration = {setDuration}
                            booking = {booking} setBooking = {setBooking}/>
                        </div>
                    
                        <div className='listing-right-column'>
                            <ReserveBlock  
                            range = {range} setRange = {setRange}
                            duration = {duration} setDuration = {setDuration}
                            listing={listing} count={count} rating={rating}
                            booking = {booking} setBooking = {setBooking}/>
                        </div>

                    </div>

                    <div className='reviews-block'>
                        <Reviews count={count} rating={rating} findAverageScore={findAverageScore}/>
                    </div>

                    <div className='create-review'>
                        {userReview ? null : <ReviewForm key={review.id} review={review} setReview={setReview} editMode={false}/>}
                    </div>

                </div>
            </div>
     
        )
    }

}

export default ShowListing