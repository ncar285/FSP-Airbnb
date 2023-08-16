import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import { useState } from "react";
// import facebookIcon from "../../../assets/icons/1.svg";
// import googleIcon from "../../../assets/icons/2.svg";
// import appleIcon from "../../../assets/icons/3.svg";
// import mailIcon from "../../../assets/icons/4.svg";

import { useRef } from "react";

import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillApple } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai'
import "./InitialForm.css"


const InitialForm = ( {userEmail, setUserEmail, deactivateRegisterModal}) => {

    const initialFormBody = useRef()

    // console.log("YO YO YO ====", userEmail)
    // const [formState, setFormState] = useState('initial');
    // const [email, setEmail] = useState('')
    const [formState, setFormState] = useState('initial');

    const loginOrSignup = async (userEmail) => {
        const response = await fetch(`/api/users/checkEmail?email=${userEmail}`);
        const data = await response.json();
        return data.exists ? 'login' : 'signup';
    };

    // const [formState, setFormState] = useState('initial');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = await loginOrSignup(userEmail)
        initialFormBody.current.style.display = "none";
        // console.log(`render the ${form}login form!`)
        setFormState(form)
        // if (form === 'login') {
        //     return <LoginForm />;
        // } else if (form === 'signup') {
        //     return <SignupForm />;
        // } 
    }

    return (
        <>
        <div ref={initialFormBody} className="body">
            <h1 className="initial-form">
                Welcome to Airbnb
            </h1>

            {formState === 'initial' && (
                <form onSubmit={handleSubmit}>
            {/* <form onSubmit={handleSubmit}> */}
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

            {/* {formState === 'login' && 
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
        } */}

            <div className="spacer">
                <div className="line"></div>
                <div className="or-text">or</div>
                <div className="line"></div>
            </div>
                
            <div className="quick-sign-up">
                <form action="">
                    <button>
                        <div className="button-icon">
                            <AiFillFacebook className="icon" id="facebook"/>
                            {/* <img src={facebookIcon} alt="" /> */}
                        </div>
                        <div className="main">Continue with Facebook</div>
                    </button>
                    <button>
                        <div className="button-icon">
                            <FcGoogle className="icon" id="google"/>
                            {/* <img src={facebookIcon} alt="" /> */}
                        </div>
                        <div className="main">Continue with Google</div>
                    </button>
                    <button>
                        <div className="button-icon">
                            <AiFillApple className="icon" id="apple"/>
                            {/* <img src={facebookIcon} alt="" /> */}
                        </div>
                        <div className="main">Continue with Apple</div>
                    </button>
                    <button className="email">
                        <div className="button-icon">
                            <AiOutlineMail className="icon" id="mail"/>
                            {/* <img src={facebookIcon} alt="" /> */}
                        </div>
                        <div className="main">Continue with email</div>
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


// {formState === 'initial' && (
//     <form onSubmit={handleSubmit}>
//         {/* ... */}
//     </form>
// )}

// {formState === 'login' && <LoginForm />}
// {formState === 'signup' && <SignupForm />}