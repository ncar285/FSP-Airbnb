import profile from "../../../assets/user_pic-225x225.png"
import { deactivateRegisterModal } from "../../../store/uiReducer"
import { useDispatch, useSelector } from "react-redux"
import InitialForm from "../InitialForm/InitialForm"
import { useRef } from "react";
import { useEffect } from "react";
import { logoutUser } from "../../../store/sessionsReducer";
import { getCurrentUser } from "../../../store/sessionsReducer";

const WelcomeBackForm = ({ setUserEmail, currentUser, formState, setFormState}) => {

    useEffect(() => {
        setFormState('welcome');
    }, []);

    const welcomeBackBody = useRef()

    const sessionUser = useSelector(getCurrentUser);

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(deactivateRegisterModal())
    }
    
    const handleSignOut = async e => {
        e.preventDefault()
        welcomeBackBody.current.style.display = "none";
        dispatch(logoutUser(currentUser.id));
        setFormState('initial');
    }

    return (
        <>
            <div ref={welcomeBackBody} className="body">
                <div>(welcome-back form)</div>
                <div className="login-profile">
                    <img src={profile} alt="" />
                    <div className="user-email">{sessionUser.email}</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <button className="continue main">Continue</button>
                    <p>Not you? <a onClick={handleSignOut} href="">Use another account</a></p>
                </form>
            </div>

            {(formState === 'initial') &&
            <InitialForm 
            currentUser={currentUser}
            userEmail={currentUser.email} 
            setUserEmail={setUserEmail} 
            deactivateRegisterModal = {deactivateRegisterModal}
            formState={formState}
            setFormState={setFormState}
            />}
        </>
    )

}

export default WelcomeBackForm