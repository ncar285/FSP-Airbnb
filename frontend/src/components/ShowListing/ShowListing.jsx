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
    }

    return (
        <>
           
            {/* (!listing) */}
            <h1>hello world</h1>
            <h1>{listing.title}</h1>
        </>

    )
}

export default ShowListing