import "./NavBar.css"
import logo from "../../assets/airbnb.svg"
import AccountMenu from "../AccountMenu/AccountMenu.jsx"
import { useState } from "react";
import SearchBar from "./Search/SearchBar";
import MenuButton from "./MenuButton/MenuButton";
import TagBar from "./TagBar/TagBar";
// import { AiOutlineSearch } from "react-icons/ai" // (search icon)
// import { FaAirbnb } from "react-icons/fa"   // airbnb logo

const NavBar = ({ tagsOn, searchType, barType}) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuClick = () => {
        if (menuOpen){
            setMenuOpen(false)
        }else {
            setMenuOpen(true)
        }
    }

    const dynamicStyle = () => {
        if (barType === "home"){
            return {
                margin: "var(--margin)",
                position: "sticky"
            }
        }else if (barType === "show") {
            return {
                margin: "var(--show_margin)",
                position: "static"
            }
        }
    }

    




    const handleGoHome = () => {
        window.location.href = '/';
    }

    return (
        
        <div className="nav-bar" style={{ position: dynamicStyle().position }}>
            <div className="upper-nav-bar">
                <div onClick={handleGoHome}
                className="left-logo" style={{ left: dynamicStyle().margin}}>
                    <img id="logo" src={logo} alt="fairbnb-logo" />
                </div>
                <div className="middle-search">
                    <SearchBar searchType = {searchType}/>
                </div >
                <div className='right-menu' style={{ right: dynamicStyle().margin}}>
                    <MenuButton handleMenuClick={handleMenuClick}/>
                </div>
                {
                menuOpen &&
                < AccountMenu margin = {dynamicStyle().margin} handleMenuClick = {handleMenuClick}/>
                }
            </div>
            <div className="lower-nav-bar">
                { tagsOn && <TagBar/>}
            </div>
        </div>
    )

}

export default NavBar