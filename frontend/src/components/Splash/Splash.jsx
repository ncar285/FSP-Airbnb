import './Splash.css'
import LoadingItem from './LoadingItem'
import { useDispatch, useSelector } from "react-redux"
import { getListings, selectListings } from "../../store/listingsReducer"
import ListingItem from "./ListingItem.jsx"
import { useContext, useEffect } from "react"
import { SearchContext } from '../../App'
// import { fetchListings } from '../../utils/listingApiUtils'

const Splash = () => {

  const listings = useSelector(selectListings)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListings())
  },[])

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