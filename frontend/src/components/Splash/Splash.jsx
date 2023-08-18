import './Splash.css'
import { useDispatch, useSelector } from "react-redux"
import { fetchListings, selectAllListings } from "../../store/listingsReducer"
import ListingItem from "./ListingItem.jsx"
import { useEffect } from "react"

const Splash = () => {

    const listings = useSelector(selectAllListings)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchListings())
    },[dispatch])

    return (
        <>
          {Object.values(listings).map(listing => (
            <ul className="listings-splash">
              <ListingItem listing={listing} key={listing.id}/>
            </ul>
          ))}
        </>
      )
}

export default Splash