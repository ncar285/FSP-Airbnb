import './MenuButton.css'
import { IoMdMenu } from "react-icons/io" 
import { useSelector } from "react-redux/es/hooks/useSelector"
import { getCurrentUser } from "../../../store/sessionsReducer"
import { CgProfile } from "react-icons/cg"
const MenuButton = ({ handleMenuClick }) => {
    const currentUser = useSelector(getCurrentUser)

    return (
        <button onClick={handleMenuClick} 
        className="account-button" 
        id="account-button">
            <div className="list">
                <IoMdMenu className="menu-list"/>
            </div>
            <div className="profile-icon">{currentUser?.photoUrl ? 
                <img src={currentUser.photoUrl} alt=""/> : 
                <CgProfile id="default-profile"/>}
            </div>
         
        </button>
    )

}

export default MenuButton