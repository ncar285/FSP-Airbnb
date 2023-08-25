import './ShowListing.css'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState} from "react"
import { selectListing, fetchListing } from "../../store/listingsReducer"
import PhotoAlbum from './PhotoAlbum/PhotoAlbum'
import ListingInfo from './ListingInfo/ListingInfo'
import ReserveBlock from './ReserveBlock/ReserveBlock'
import Reviews from './Reviews/Reviews'
import ReviewForm from '../ReviewForm/ReviewForm'
import { setCurrentReviews } from '../../store/reviewsReducer'
import { getUserReview } from '../../store/reviewsReducer'
// import { selectListing } from '../../store/listingsReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { getListingRevews } from '../../store/reviewsReducer'


const ShowListing = () => {
    // const listingId = useSelector(selectListing).id
    const currentUserId = useSelector(getCurrentUser)?.id 
    const { listingId } = useParams();
    const dispatch = useDispatch()
    const listing = useSelector(selectListing(listingId))
    const userReview = useSelector(getUserReview)

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

    // console.log("THIS IS THE NEW REVIEW",newReview)
    
    const [review, setReview] = useState(newReview)
    
    useEffect(() => {
        dispatch(fetchListing(listingId));
    }, [dispatch, listingId]);
    
    useEffect(() => {
        if (listing && listing.reviews) {
            dispatch(setCurrentReviews(listing.reviews));
        }
    }, [listing]);


    useEffect(()=>{
        // if (myReview){
            setReview(review)
        // }
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
                        <p>4.5 stars, 21 reviews, {listing.city}, {listing.state} </p>
                    </div>
                    <PhotoAlbum listing={listing}/>

                    
                    
                    <div className='show-page-contents'>

                        <div className='listing-left-column'>
                            <ListingInfo listing={listing}/>
                        </div>
                    
                        <div className='listing-right-column'>
                            <ReserveBlock  listing={listing} count={count} rating={rating}/>
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