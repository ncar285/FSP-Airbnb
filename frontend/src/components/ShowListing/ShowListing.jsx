import './ShowListing.css'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import { selectListing, fetchListing } from "../../store/listingsReducer"
import PhotoAlbum from './PhotoAlbum/PhotoAlbum'
import ListingInfo from './ListingInfo/ListingInfo'
import ReserveBlock from './ReserveBlock/ReserveBlock'
import Reviews from './Reviews/Reviews'
const ShowListing = () => {

    const { listingId } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchListing(listingId));
    }, [dispatch, listingId]);

    const listing = useSelector(selectListing(listingId))

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
                            <ReserveBlock/>
                        </div>

                    </div>

                    <div className='reviews-block'>
                        <Reviews reviews = {listing.reviews}/>
                    </div>

                </div>
            </div>
        )
    }

}

export default ShowListing