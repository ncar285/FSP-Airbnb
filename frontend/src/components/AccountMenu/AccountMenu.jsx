import './AccountMenu.css'
import account from "../../assets/account.png"
// import { useEffect } from 'react';
import { useState } from "react";
import RegisterForm from '../RegisterForm/RegisterForm';
import { activateRegisterModal } from '../../store/uiReducer';
import { useDispatch } from "react-redux"


const AccountMenu = () => {

   
    //! Code doesn't work
    // const dropdown = document.getElementById('account-options');
    // const button = document.querySelector('.account-button')

    // const handleButtonClick = () => {
    // if(!button.classList.contains('on')){
    //     button.classList.add('on')
    //     dropdown.classList.remove('hidden')
    // }
    // }

    // document.addEventListener('click', function(e) {
    //     if (dropdown.contains(e.target)) {
    //         return;
    //     }
    //     dropdown.classList.add('hidden')
    // });

    const [showRegister] = useState(false)

    const dispatch = useDispatch();

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

                <div className="account-options" id="account-options">
                    <button onClick={() => dispatch(activateRegisterModal())}>Login</button>
                    <button onClick={() => dispatch(activateRegisterModal())}>Sign up</button>
                </div>
            </div>

            {showRegister && (
                <RegisterForm closeModal={true}/>
            )}

        </>

    )
}

export default AccountMenu
