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

export default Splash