import './AccountMenu.css'
import account from "../../assets/account.png"
import { useState } from "react";
import RegisterForm from '../RegisterForm/RegisterForm';
import { activateRegisterModal } from '../../store/uiReducer';
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from '../../store/sessionsReducer';
import { logoutUser } from '../../store/sessionsReducer';


const AccountMenu = () => {

    const [showRegister] = useState(false)
    const dispatch = useDispatch();
    const sessionUser = useSelector(getCurrentUser);
  
    
    const handleSignOut = async e => {
        e.preventDefault()
        dispatch(logoutUser());
        //     window.location.reload(); 
    }

    const menuButtons = () => {
        if (sessionUser)  {
            return  (
                <div className="account-options" id="account-options">
                    <button onClick={handleSignOut}>Logout</button>
                </div>
            )
        }else {
            return (
                <div className="account-options" id="account-options">
                    <button onClick={() => dispatch(activateRegisterModal())}>Login</button>
                    <button onClick={() => dispatch(activateRegisterModal())}>Sign up</button>
                </div>
            )

        }
    }

    return (
        <>

            <div className='account-options-container'>

                <button className="account-button" id="account-button">
    
                    <div className="list">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div className="profile">
                        <img src={account} alt="" />
                    </div>
        
                </button>

                {menuButtons()}

            </div>

            {showRegister && (
                <RegisterForm closeModal={true}/>
            )}

        </>

    )
}

export default AccountMenu
