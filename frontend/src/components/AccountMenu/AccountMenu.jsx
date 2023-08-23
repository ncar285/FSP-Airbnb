import './AccountMenu.css'
import { useState } from "react";
import RegisterForm from '../RegisterForm/RegisterForm';
import { activateRegisterModal } from '../../store/uiReducer';
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from '../../store/sessionsReducer';
import { logoutUser } from '../../store/sessionsReducer';


const AccountMenu = ({ handleMenuClick, margin }) => {

    const [showRegister] = useState(false)
    const dispatch = useDispatch();
    const sessionUser = useSelector(getCurrentUser);

    const seeAccount = async e => {
        e.preventDefault()
    }
    
    const handleSignOut = async e => {
        e.preventDefault()
        dispatch(logoutUser());
        window.location.reload(); 
    }

    const handleRegister = async () => {
        handleMenuClick()
        dispatch(activateRegisterModal())
    }

    const menuButtons = () => {
        if (sessionUser)  {
            return  (
                <>
                    <div style={{ right: margin}} className="account-options" id="account-options">
                        <button onClick={seeAccount}>Account</button>
                        <div class="account-menu-spacer"></div>
                        <button onClick={handleSignOut}>Logout</button>
                    </div>
                </>
            )
        }else {
            return (
                <div style={{ right: margin}} className="account-options" id="account-options">
                    <button onClick={handleRegister}>Login</button>
                    <button onClick={handleRegister}>Sign up</button>
                </div>
            )

        }
    }

    return (
        <>

                
            {menuButtons()}

            {showRegister && (
                <RegisterForm closeModal={true}/>
            )}

        </>

    )
}

export default AccountMenu
