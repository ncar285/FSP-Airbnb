import "./RegisterForm.css"

import { deactivateRegisterModal, activateRegisterModal} from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"
import SignupForm from "./SignupForm/SignupForm";
import LoginForm from "./LoginForm/LoginForm";
import InitialForm from "./InitialForm/InitialForm";
import WelcomeBackForm from "./WelcomeBackForm/WelcomeBackForm";
// import { getCurrentUser } from "../../store/sessionsReducer";
import { useState } from "react"


const RegisterForm = () => {

    const [formState, setFormState] = useState('initial');
    const [email, setEmail] = useState('')
    const currentUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch()
    const display = useSelector(state => state.ui.registerModal)

    // For now, always set the modal to on! Remove later
    dispatch(activateRegisterModal())

    if (!display) return null


   
    // const handleBackgroundClick = e => {
    //     e.stopPropagation()
    //     dispatch(deactivateRegisterModal())
    // }

    // const loginOrSignup = async e => {
    //     e.preventDefault();
    //     const response = await fetch(`/api/users/checkEmail?email=${email}`);
    //     const data = await response.json();
    //     if (data.exists) {
    //         setFormState('login');
    //     } else {
    //         setFormState('signup');
    //     }
    // };

    if (currentUser) {
        return <WelcomeBackForm currentUser={currentUser}/>;
    } else if (formState === 'initial') {
        return <InitialForm  />;
    } else if (formState === 'login') {
        return <LoginForm currentUser={currentUser}/>;
    } else if (formState === 'signup') {
        return <SignupForm />;
    } 

}

export default RegisterForm