import "./NavBar.css"
import logo from "../../assets/airbnb.svg"
// import sButton from "../../assets/s-button.png"
// import { activateSearchModal } from "../../store/uiReducer";
import {  useSelector} from "react-redux";
import AccountMenu from "../AccountMenu/AccountMenu.jsx"
import { getCurrentUser } from "../../store/sessionsReducer";
import { useState } from "react";
// import account
import account from "../../assets/account.png"
import SearchBar from "./Search/SearchBar";
// import { AiOutlineSearch } from "react-icons/ai" // (search icon)
// import { FaAirbnb } from "react-icons/fa"   // airbnb logo
// import { AiOutlineMenu } from "react-icons/ai" // menu icon


const NavBar = () => {
    function importAll(r) {
        return r.keys().map(r);
    }
    const images = importAll(require.context('../../assets/tags', false, /\.jpeg$/));
    const [menuOpen, setMenuOpen] = useState(false)
    const currentUser = useSelector(getCurrentUser)

    const handleMenuClick = () => {
        if (menuOpen){
            setMenuOpen(false)
        }else {
            setMenuOpen(true)
        }
    }

    return (
        
        <div className="bar">
            <div className="innerBar">
                
                <div className="left-logo">
                    <img id="logo" src={logo} alt="fairbnb-logo" />
                </div>
                <div className="middle-search">
                    <SearchBar/>
                    {/* {search()} */}
                </div >
                <div className='right-menu'>
                    <button onClick={handleMenuClick} className="account-button" id="account-button">
                        <div className="list">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="profile">
                            <img src={currentUser?.photoUrl ? currentUser.photoUrl : account} alt="" />
                        </div>
                    </button>
                </div>

                {menuOpen &&
                < AccountMenu handleMenuClick = {handleMenuClick}/>
                }

                
            </div>
            <div className="tag-bar">
                {/* {images} */}

            </div>
        </div>
    )

}

export default NavBar