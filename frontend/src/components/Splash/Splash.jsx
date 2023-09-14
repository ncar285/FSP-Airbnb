import './Splash.css'
import LoadingItem from './LoadingItem'
import { useDispatch, useSelector } from "react-redux"
import { getListings, selectListings } from "../../store/listingsReducer"
import ListingItem from "./ListingItem.jsx"
import { useContext, useEffect } from "react"
import { SearchContext } from '../../App'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import { fetchListings } from '../../utils/listingApiUtils'
import { BsFillMapFill } from 'react-icons/bs'

const Splash = () => {

  const listings = useSelector(selectListings)
  const dispatch = useDispatch();
  const { searchParams, setSearchParams }  = useContext(SearchContext);

  const history = useHistory();

  const mapMode = () => {
    history.push('/map')
  }
  


  useEffect(() => {
    if (searchParams.search){
      dispatch(getListings({ search: searchParams.search }));
    } else {
      dispatch(getListings())
    }
  },[])

  return (
    <>
      <ul  className="splash">
        {listings.map(listing => (
            <ListingItem key={listing.id} listing={listing}/>
        ))}
      </ul>


      <button className='toggle-map-button' onClick={mapMode}>
        Show map
        <BsFillMapFill className='toggle-map-icon'/>
      </button>

    </>
  )
}


export default Splash