import "./RegisterForm.css"

import { deactivateRegisterModal, activateRegisterModal} from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"
import SignupForm from "./SignupForm/SignupForm";
import LoginForm from "./LoginForm/LoginForm";
import InitialForm from "./InitialForm/InitialForm";
import WelcomeBackForm from "./WelcomeBackForm/WelcomeBackForm";
// import { getCurrentUser } from "../../store/sessionsReducer";
import { useState } from "react"
import cross from "../../assets/cross.svg"



const RegisterForm = () => {

    const [formState, setFormState] = useState('initial');
    const [email, setEmail] = useState('')
    const currentUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch()
    const display = useSelector(state => state.ui.registerModal)

    //! For now, always set the modal to on! Remove later
    dispatch(activateRegisterModal())

    if (!display) return null

    const handleBackgroundClick = e => {
        e.stopPropagation()
        dispatch(deactivateRegisterModal())
    }

    return (
        <div className="modal-conainter">
            <div 
                className="register-background" 
                onClick={handleBackgroundClick}
                >
            </div>
            <div className="register-modal">
                <div className="modal-header">
                    <button data-close-button id="close-button">
                        {/* &times; */}
                        <img src={cross} alt="" />
                    </button>
                    <div className="title-box"> 
                        <h2 className="title">
                            Log in or sign up
                        </h2>
                    </div>
                </div>

                <InitialForm  />
                {/* <WelcomeBackForm currentUser={currentUser}/> */}
                {/* <LoginForm currentUser={currentUser}/> */}
                {/* <SignupForm /> */}

            </div>
        </div>
    )

    // if (currentUser) {
    //     return <WelcomeBackForm currentUser={currentUser}/>;
    // } else if (formState === 'initial') {
    //     return <InitialForm  />;
    // } else if (formState === 'login') {
    //     return <LoginForm currentUser={currentUser}/>;
    // } else if (formState === 'signup') {
    //     return <SignupForm />;
    // } 

}

export default RegisterForm