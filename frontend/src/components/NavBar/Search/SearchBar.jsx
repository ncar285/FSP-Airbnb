import './SearchBar.css'
import { useDispatch, useSelector } from "react-redux"
// import { activateSearchModal } from "../../../store/uiReducer"
import sButton from "../../../assets/s-button.png"
import { useContext, useState } from 'react'
// import { SearchContext } from '../../../App'
import { getListings } from '../../../store/listingsReducer'

const SearchBar = ({ searchType }) => {
    // const hideSearchBar = useSelector(state => state.ui.searchModal)
    const dispatch = useDispatch()
    const [searchString, setSearchString] = useState("")

    const updateSearch = e => {
        if (e.target.value){
            setSearchString(e.target.value)
        }
    }

    const handleSearch = () => {
        // setSearchParams({ search: searchString });
        dispatch(getListings({ search: searchString }));
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