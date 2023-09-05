import './SearchBar.css'
import { useDispatch, useSelector } from "react-redux"
// import { activateSearchModal } from "../../../store/uiReducer"
import sButton from "../../../assets/s-button.png"
import { useState } from 'react'

const SearchBar = ({ searchType }) => {

    const [searchString, setSearchString] = useState("")

    // const hideSearchBar = useSelector(state => state.ui.searchModal)
    const dispatch = useDispatch()


    const updateSearch = e => {
        const newSearchVal = e.target.value;
        setSearchString(newSearchVal);
        if (e.target.value){
            // change the show page listings
        }

    }

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
                <div className="s-button">
                    <img src={sButton} alt="" />
                </div>
            </div>
        )
    }
}

export default SearchBar