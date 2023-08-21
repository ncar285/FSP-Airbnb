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
                    <div className='show-subheading'>
                        <p>stars, reviews, city, state / country </p>
                    </div>
                    <div className="photo-album">
                        <div className='LHS-show'>
                            <img className='main-show-image' src={listing.photoUrls[1]}  alt="" />
                        </div>
                        <div className='RHS-show'>
                            <div className='RHS-upper'>
                                <div className='album-1 RHS-img'>
                                    <img className='RHS-image-1' src={listing.photoUrls[2]} alt="" />
                                </div>
                                <div className='album-2 RHS-img'> 
                                    <img src={listing.photoUrls[3]}  alt="" />
                                </div>
                            </div>
                            <div className='RHS-lower'>
                                <div className='album-3 RHS-img'> 
                                    <img src={listing.photoUrls[4]}  alt="" />
                                </div>
                                <div className='album-4 RHS-img'>
                                    <img src={listing.photoUrls[5]}  alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default ShowListing