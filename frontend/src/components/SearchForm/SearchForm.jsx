import "./SearchForm.css"

import { deactivateSearchModal } from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"

const SearchForm = () => {

    const dispatch = useDispatch();

    const display = useSelector(state => state.ui.searchModal)

    const handleBackgroundClick = e => {
        e.stopPropagation()
        const sBar = document.querySelector(".bar")
        sBar.classList.remove("s-mode")
        dispatch(deactivateSearchModal())
    }

    if (!display) return null

    return (
        <div className="modal">
            <div className="search-background" onClick={handleBackgroundClick}>

            </div>
            <div className="nav-extender"></div>
            <div className="search-modal">
                <h2>Search Form</h2>
                <p>Many divs and cool css goes here!</p>

            </div>
        </div>

    )
}

export default SearchForm