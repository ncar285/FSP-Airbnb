import './SearchBar.css'
import { useDispatch, useSelector } from "react-redux"
import { activateSearchModal } from "../../../store/uiReducer"
import sButton from "../../../assets/s-button.png"

const SearchBar = () => {
    const hideSearchBar = useSelector(state => state.ui.searchModal)
    const dispatch = useDispatch()
    if (hideSearchBar){
        const sBar = document.querySelector(".bar")
        sBar.classList.add("s-mode")
        return (<></>)
    }else {
        return (
            <button onClick={() => dispatch(activateSearchModal())} className="search-bar">
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
    }
}

export default SearchBar