import "./NavBar.css"
import logo from "../../assets/airbnb.svg"

import {  useSelector} from "react-redux";
import AccountMenu from "../AccountMenu/AccountMenu.jsx"
import { getCurrentUser } from "../../store/sessionsReducer";
import { useState } from "react";
import SearchBar from "./Search/SearchBar";
// import { AiOutlineSearch } from "react-icons/ai" // (search icon)
// import { FaAirbnb } from "react-icons/fa"   // airbnb logo
import MenuButton from "./MenuButton/MenuButton";


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
                    <SearchBar type = {"simple"}/>
                </div >
                <div className='right-menu'>
                    <MenuButton handleMenuClick={handleMenuClick}/>
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