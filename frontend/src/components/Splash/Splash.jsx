import './Splash.css'
import LoadingItem from './LoadingItem'
import LoadingSplash from '../LoadingSplash/LoadingSplash'
import { useDispatch, useSelector } from "react-redux"
import { getListings, selectListings } from "../../store/listingsReducer"
import ListingItem from "./ListingItem.jsx"
import { useContext, useEffect, useState } from "react"
import { SearchContext } from '../../App'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import { fetchListings } from '../../utils/listingApiUtils'
import { BsFillMapFill } from 'react-icons/bs'

const Splash = () => {

  const [isLoading, setIsLoading] = useState(true);
  const listings = useSelector(selectListings)
  const dispatch = useDispatch();
  const { searchParams }  = useContext(SearchContext);
  const history = useHistory();

  const mapMode = () => {
    history.push('/map')
  }
  

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.search){
        await dispatch(getListings({ search: searchParams.search }));
      } else {
        await dispatch(getListings());
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSplash/>
  }

  return (
    <>
      {listings.length === 0 &&
      <div className='no-result-search'>
        <p>No results match this search</p>
      </div>
      }
      <ul  className="splash">
        {listings.map(listing => (
            <ListingItem key={listing.id} listing={listing}/>
        ))}
        {/* {listings.map(listing => {
    console.log("Listing ID:", listing.id);  // Debug line
    return <ListingItem key={listing.id} listing={listing}/>
})} */}
      </ul>


      <button className='toggle-map-button' onClick={mapMode}>
        Show map
        <BsFillMapFill className='toggle-map-icon'/>
      </button>

    </>
  )
}


export default Splash