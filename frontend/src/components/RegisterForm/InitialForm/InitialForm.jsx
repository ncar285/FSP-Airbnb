import "./InitialForm.css"
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import { useState } from "react";
import { useRef } from "react";
import { BsArrowRightCircleFill } from 'react-icons/bs'
import { useDispatch } from "react-redux";
import { login } from "../../../store/sessionsReducer";
// import facebookIcon from "../../../assets/icons/1.svg";
// import googleIcon from "../../../assets/icons/2.svg";
// import appleIcon from "../../../assets/icons/3.svg";
// import mailIcon from "../../../assets/icons/4.svg";
// import { FcGoogle } from 'react-icons/fc';
// import { AiFillFacebook } from 'react-icons/ai';
// import { AiFillApple } from 'react-icons/ai';
// import { AiOutlineMail } from 'react-icons/ai'

const InitialForm = ( {userEmail, setUserEmail, deactivateRegisterModal}) => {

    const dispatch = useDispatch();
    const initialFormBody = useRef();
    const [formState, setFormState] = useState('initial');

    const loginOrSignup = async (userEmail) => {
        const response = await fetch(`/api/users/checkEmail?email=${userEmail}`);
        const data = await response.json();
        return data.exists ? 'login' : 'signup';
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = await loginOrSignup(userEmail)
        initialFormBody.current.style.display = "none";
        setFormState(form)
    }

    const handleDemoLogin = async() => {
        const user = {
            email: "demis@user.io",
            password: "password"
        }
        const res = dispatch(login(user))
        if (res){
            dispatch(deactivateRegisterModal());
        } else {
            // return ['ERROR LOGGING IN => CREDENTIALS']
        }
    }

    return (
        <>
        <div ref={initialFormBody} className="body">
            <h1 className="initial-form">
                Welcome to Airbnb
            </h1>

            {formState === 'initial' && (
                <form onSubmit={handleSubmit}>
                    <label>
                        <input 
                            className="email-input" 
                            type="text" 
                            onChange={e => setUserEmail(e.target.value)}
                            placeholder="Email"
                            />   
                    </label>
                    <button className="continue main">Continue</button>
                </form>
            )}   

            <div className="spacer">
                <div className="line"></div>
                <div className="or-text">or</div>
                <div className="line"></div>
            </div>
                
            <div className="quick-sign-up">
                <form action="">
                    <button onClick={handleDemoLogin}>
                        <div className="demo-icon">
                            <BsArrowRightCircleFill className="icon" id="demo-arrow"/>
                        </div>
                        <div className="main">Continue with Demo</div>
                    </button>
                </form>
            </div>

        </div>

        {formState === 'login' && 
            <LoginForm 
                userEmail={userEmail} 
                setUserEmail={setUserEmail}
                deactivateRegisterModal = {deactivateRegisterModal}/>
        }
            
        {formState === 'signup' && 
            <SignupForm 
                userEmail={userEmail} 
                setUserEmail={setUserEmail}
                deactivateRegisterModal = {deactivateRegisterModal}/>
        }

        </>
    )

}

export default InitialForm