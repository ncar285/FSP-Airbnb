import "./RegisterForm.css"
import "./LoginForm.css"
import "./InitialForm.css"
import "./SignupForm.css"

import {deactivateRegisterModal} from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"
import {IoIosArrowBack} from "react-icons/io"
import { useState } from "react"
import profile from "../../assets/user_pic-225x225.png";
import { login } from "../../store/sessionsReducer";
import { BsArrowRightCircleFill } from 'react-icons/bs'
import { createUser } from "../../store/sessionsReducer";
import {RxCross2} from "react-icons/rx"
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const RegisterForm = () => {

    const [formState, setFormState] = useState('initial');
    const [userEmail, setUserEmail] = useState('')

    const [invalidEmail, setInvalidEmail] = useState(false)

    const dispatch = useDispatch()
    // const currentUser = useSelector(state => state.session.user)
    const display = useSelector(state => state.ui.registerModal)

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')

    const [passwordMessage, setPasswordMessage] = useState('')
    // const [showPasswordMessage, setShowPasswordMessage] = useState(false)

    const [invalidSignUpCredentials, setInvalidSignUpCredentials] = useState(false)
    const [invalidLoginCredentials, setInvalidLoginCredentials] = useState(false)

    const history = useHistory()
    
    if (!display) return null

    const handleDemoLogin = async() => {
        const user = {
            email: "demo@user.io",
            password: "tomandjerryarethegreatest"
        }
        const res = dispatch(login(user))
        if (res){
            dispatch(deactivateRegisterModal());
            history.push('/account');
        } else {
            // should never error
        }
    }


    const handleLogin = async e => {
        e.preventDefault();
        const user = {
            email: userEmail,
            password
        }
        try {
            const res = await dispatch(login(user));
            if (res) {
                dispatch(deactivateRegisterModal());
            } else {
                setInvalidLoginCredentials(true);
            }
        } catch (error) {
            setInvalidLoginCredentials(true);
        }
    }


    const handleBackgroundClick = e => {
        e.stopPropagation()
        dispatch(deactivateRegisterModal())
    }

    const handleCrossClick = e => {
        e.stopPropagation()
        dispatch(deactivateRegisterModal())
    }

    const checkPassword = () => {
        const length = password.length >= 6 ? true : false 
        const number = /[0-9]/.test(password);
        let invalidParam
        if (!length && !number) invalidParam = 'Password 6 or more characters, including at least 1 number'
        if (!length && number) invalidParam = 'Password must be at least 6 characters'
        if (length && !number) invalidParam = 'Password must contain at least 1 number'
        return (length && number) || invalidParam
    }

    const handleSignup = async e => {
        setInvalidSignUpCredentials(false)
        e.preventDefault();
        const passwordCheck = checkPassword()
        if (passwordCheck === true) {
            const user = {
                email: userEmail,
                firstname,
                lastname,
                password
            }
            dispatch(createUser(user))
            dispatch(deactivateRegisterModal())
        } else {
            setInvalidSignUpCredentials(true)
            setPasswordMessage(passwordCheck)
        }
    }

    const isValidEmail = email => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);


    const loginOrSignup = async (userEmail) => {
        if (isValidEmail(userEmail)){
            const response = await fetch(`/api/users/checkEmail?email=${userEmail}`);
            const data = await response.json();
            if (data.exists){
                setFirstname(data.name)
                return 'login'
            } else {
                return 'signup'
            }
        } else {
            setInvalidEmail(true)
            return "initial"
        }
    };

    const handleEmailEnter = async (e) => {
        e.preventDefault()
        const newFormState = await loginOrSignup(userEmail)
        setFormState(newFormState)
    }
    

    return (
        <div className="modal-container">
            <div className="register-background" 
                onClick={handleBackgroundClick}>
            </div>
            <div className="register-modal">

                <div className="modal-header">
                    <button id="navigate-register-button">
                        {(formState === 'signup' || formState === 'login') ? 
                            <IoIosArrowBack onClick={()=>setFormState('initial')}/> : 
                            <RxCross2 onClick={handleCrossClick} />
                        }
                    </button>
                    <div className="title-box"> 
                        <h2 className="title">
                            {formState === 'initial' ? "Log in or sign up" : 
                            (formState === 'signup' ? "Finish signing up" : 
                            (formState === 'login' ? `Welcome back, ${firstname}` : "")
                            )}
                        </h2>
                    </div>
                </div>

                {formState === 'initial' && 

                <div className="body">
                    <h1 className="initial-form">
                        Welcome to Fairbnb
                    </h1>

                    <form>
                        <label>
                            <input 
                                className="email-input" 
                                type="text" 
                                onChange={e => setUserEmail(e.target.value)}
                                placeholder="Email"
                                />   
                        </label>
                        {
                            invalidEmail && 
                            <div>Enter a valid email.</div>
                        }
                        <button 
                        onClick={handleEmailEnter}
                        type="button"
                        className="continue main"
                        >Continue</button>
                    </form>

                    <div className="spacer">
                        <div className="line"></div>
                        <div className="or-text">or</div>
                        <div className="line"></div>
                    </div>
                    
                    <div className="quick-sign-up">
                        <form action="">
                            <button onClick={handleDemoLogin}>
                                {/* <div className="demo-icon">
                                    <BsArrowRightCircleFill className="icon" id="demo-arrow"/>
                                </div> */}
                                <div className="main">Login as Demo User <MdKeyboardArrowRight className="demo-arrow"/></div>
                            </button>
                        </form>
                    </div>

                </div>

                }

                {
                    (formState === "login") &&

                    <div className="body">
                
                        <div className="login-profile">
                            <img src={profile} alt="" />
                            <div className="user-email">{userEmail}</div>
                        </div>
                    
                        <form onSubmit={handleLogin}>
                            <input 
                                className="password-input"
                                type="password" 
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                            />  
                            <div className="warning-message-space">
                                { invalidLoginCredentials && 
                                    <p>Your email or password is incorrect</p>
                                }
                            </div>
                            <button className="continue main">Continue</button>
                            <div className="use-another-acc">
                                <p>Not you?</p> 
                                <a href="">
                                    <div
                                    onClick={()=>setFormState('signup')}>
                                    Use another account</div>
                                </a>
                            </div>
                        </form>

                    </div>

                }

                {
                    (formState === "signup") && 
                    
                        <div className="body">
                        <form onSubmit={handleSignup}>

                            <div id="name-inputs">
                                <input 
                                    id="firstname-input" 
                                    type="text" 
                                    onChange={e => setFirstname(e.target.value)}
                                    placeholder="Firstname"
                                />   
                                <input 
                                    id="lastname-input" 
                                    type="text" 
                                    onChange={e => setLastname(e.target.value)}
                                    placeholder="Lastname"
                                />  
                            </div>
                        
            
                            <input 
                                className="email-input" 
                                type="text" 
                                placeholder="Email"
                                onChange={e => setUserEmail(e.target.value)}
                                value={userEmail}
                            />    
                            
                            <input 
                                type="password" 
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                            />  

                            <div className="warning-message-space">
                                { invalidSignUpCredentials && 
                                    <p>{passwordMessage}</p>
                                }
                            </div>
                        
                            <button className="continue main">Continue</button>
                        </form>
                    </div>
                   
                }

    
                
            </div>
        </div>
    )


}

export default RegisterForm