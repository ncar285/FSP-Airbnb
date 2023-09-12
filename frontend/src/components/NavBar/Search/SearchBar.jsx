import './SearchBar.css'
import { useDispatch, useSelector } from "react-redux"
// import { activateSearchModal } from "../../../store/uiReducer"
import sButton from "../../../assets/s-button.png"
import { useContext, useState } from 'react'
import { SearchContext } from '../../../App'
import { getListings } from '../../../store/listingsReducer'
import { useHistory } from 'react-router-dom';

const SearchBar = ({ searchType, setSearchParams}) => {

    // const hideSearchBar = useSelector(state => state.ui.searchModal)
    const dispatch = useDispatch()
    const [searchString, setSearchString] = useState("")
    const history = useHistory();
    

    const updateSearch = e => {
        setSearchString(e.target.value)
    }

    const handleSearch = () => {
        history.push('/');
        dispatch(getListings({ search: searchString }));
        setSearchParams({ search: searchString });
    };

    // if (hideSearchBar){
    //     const sBar = document.querySelector(".nav-bar")
    //     sBar.classList.add("s-mode")
    //     return (<></>)
    // }else 
    
    if ( searchType === "full"){
        return (
            <button 
            // onClick={() => dispatch(activateSearchModal())} 
            className="search-bar">
                <div className="search-filters">
                    <div className="bold"><p>Anywhere</p></div>
                    <div className="bold"><p>Any week</p></div>
                    <div id="guests"><p>Add guests</p></div>
                </div>
                <div className="s-button">
                    <img src={sButton} alt="" />
                </div>
            </button>
        )
    }else if ( searchType === "simple"){
        return (
            <div 
            // onClick={() => dispatch(activateSearchModal())} 
            className="search-bar">
                <div className="search-prompt">
                    <input className='search-string'
                    type="text" 
                    onChange = {updateSearch}
                    placeholder='Start your search' 
                    value = {searchString}/>
                </div>
                <div className="s-button" onClick={handleSearch}>
                    <img src={sButton} alt="" />
                </div>
            </div>
        )
    }
}

export default SearchBar