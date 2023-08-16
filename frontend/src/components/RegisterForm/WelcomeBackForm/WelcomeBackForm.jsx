import profile from "../../../assets/user_pic-225x225.png"
import { deactivateRegisterModal } from "../../../store/uiReducer"
import { useDispatch } from "react-redux"
import InitialForm from "../InitialForm/InitialForm"
import { useRef } from "react";
import { logoutUser } from "../../../store/usersReducer";
import { useEffect } from "react";

const WelcomeBackForm = ({ setUserEmail, currentUser, userEmail, formState, setFormState}) => {

    useEffect(() => {
        setFormState('welcome');
    }, []);
    // setFormState('welcome')

    const dispatch = useDispatch()

    const welcomeBackBody = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(deactivateRegisterModal())
    }
    
    const handleSignOut = async e => {
        e.preventDefault()
        // const res = dispatch(logoutUser(currentUser.id))
        await dispatch(logoutUser(currentUser.id));
        welcomeBackBody.current.style.display = "none";
        setFormState('initial');
    }

    return (
        <>
            <div ref={welcomeBackBody} className="body">
                <div>(welcome-back form)</div>
                <div className="login-profile">
                    <img src={profile} alt="" />
                    <div className="user-email">{userEmail}</div>
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