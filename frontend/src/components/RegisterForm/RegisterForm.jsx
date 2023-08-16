import "./RegisterForm.css"

import { deactivateRegisterModal} from "../../store/uiReducer";
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
    const [userEmail, setUserEmail] = useState('')
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const display = useSelector(state => state.ui.registerModal)


    //! For now, always set the modal to on! Remove later
    // dispatch(activateRegisterModal())

    if (!display) return null

    const handleBackgroundClick = e => {
        e.stopPropagation()
        dispatch(deactivateRegisterModal())
    }

    const handleCrossClick = e => {
        e.stopPropagation()
        dispatch(deactivateRegisterModal())
    }


    const propAssets = {
        currentUser: currentUser,
        userEmail: userEmail,
        setUserEmail: setUserEmail,
        deactivateRegisterModal: deactivateRegisterModal,
        formState: formState,
        setFormState: setFormState,
    };

    const renderForm = () => {

        if (currentUser) {
            // setFormState('welcome')
            return <WelcomeBackForm {...propAssets}/>;
        } else if (formState === 'initial') {
            return <InitialForm {...propAssets}/>;
        } else if (formState === 'login') {
            return <LoginForm {...propAssets} />;
        } else if (formState === 'signup') {
            return <SignupForm {...propAssets}/>;
        }
    };

    return (
        <div className="modal-conainter">
            <div className="register-background" 
                onClick={handleBackgroundClick}>
            </div>
            <div className="register-modal">
                <div className="modal-header">
                    <button onClick={handleCrossClick} data-close-button id="close-button">
                        <img src={cross} alt="" />
                    </button>
                    <div className="title-box"> 
                        <h2 className="title">
                            Log in or sign up
                        </h2>
                    </div>
                </div>

                {renderForm()}
                
            </div>
        </div>
    )


}

export default RegisterForm