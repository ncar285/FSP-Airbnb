import "./NavBar.css"
import logo from "../../assets/airbnb.svg"
import sButton from "../../assets/s-button.png"
// import account from "../../assets/account.png"
import { activateSearchModal } from "../../store/uiReducer";
import { useDispatch, useSelector} from "react-redux";
import AccountMenu from "../AccountMenu/AccountMenu.jsx"
 

    
const NavBar = () => {
        
    const hideSearchBar = useSelector(state => state.ui.searchModal)

    const dispatch = useDispatch()

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

                <AccountMenu/>

                {/* <button onClick={seeAccountInfo} className="account-button">
                    <div className="nav-item right">
                        <div className="register">
                            <div className="menu">
                                <div className="more">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <div className="account">
                                <img src={account} alt="" />
                            </div>

                        </div>
                    </div>
                </button>

                <div className="account-options hidden" id="account-options">

                </div> */}


            </div>
        </div>
    )

}

export default NavBar