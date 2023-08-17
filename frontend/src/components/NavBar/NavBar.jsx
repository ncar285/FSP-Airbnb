import "./NavBar.css"
import logo from "../../assets/airbnb.svg"
import sButton from "../../assets/s-button.png"
import { activateSearchModal } from "../../store/uiReducer";
import { useDispatch, useSelector} from "react-redux";
import AccountMenu from "../AccountMenu/AccountMenu.jsx"
import { getCurrentUser } from "../../store/sessionsReducer";
import { useState } from "react";
// import account
import account from "../../assets/account.png"
// import { AiOutlineSearch } from "react-icons/ai" // (search icon)
// import { FaAirbnb } from "react-icons/fa"   // airbnb logo
// import { AiOutlineMenu } from "react-icons/ai" // menu icon

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const hideSearchBar = useSelector(state => state.ui.searchModal)
    const dispatch = useDispatch()

    const handleMenuClick = () => {
        if (menuOpen){
            setMenuOpen(false)
        }else {
            setMenuOpen(true)
        }
    }

    const search = () => {
        if (hideSearchBar){
            const sBar = document.querySelector(".bar")
            sBar.classList.add("s-mode")
            // const navbar = document.querySelector(".elevated")
            // sBar.classList.add("s-mode")
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


    return (
        <div className="bar">
            <div className="innerBar">
                <div className="nav-item left">
                    <img id="logo" src={logo} alt="fairbnb-logo" />
                    {/* <div><img/></div> */}
                    
                </div>
                <div className="nav-item middle">
                    {search()}
                </div >


                <div className='account-options-container'>
                    <button onClick={handleMenuClick} className="account-button" id="account-button">
                        <div className="list">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="profile">
                            <img src={account} alt="" />
                        </div>
                    </button>
                </div>

                {menuOpen &&
                < AccountMenu handleMenuClick = {handleMenuClick}/>
                }

            </div>
        </div>
    )

}

export default NavBar