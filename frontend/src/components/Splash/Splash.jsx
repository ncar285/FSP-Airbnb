import './Splash.css'
import LoadingItem from './LoadingItem'
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
      <ul  className="splash">
        {listings.map(listing => (
            <ListingItem key={listing.id} listing={listing}/>
        ))}
      </ul>
    </>
  )
}

// //above normalise
// "moment": "^2.29.4",

// // under react
// "react-dates": "^21.8.0",


// // under react scripts
// "react-with-direction": "^1.4.0",



export default Splash