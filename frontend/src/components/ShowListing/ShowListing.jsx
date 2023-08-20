import './ShowListing.css'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import { selectListing, fetchListing } from "../../store/listingsReducer"
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
                    <p>stars, reviews, city, state / country </p>
                    <div className="photo-album">

                    </div>
                </div>
            </div>
        )
    }

}

export default ShowListing