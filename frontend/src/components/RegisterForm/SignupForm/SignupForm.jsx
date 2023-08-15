import { useDispatch } from "react-redux";
import { createUser } from "../../../store/usersReducer";
import { useState } from "react"

const SignupForm = () => {

    const dispatch = useDispatch()

    const handleSignup = e => {
        e.preventDefault();
        const user = {
            email,
            firstname,
            lastname,
            password
        }
        dispatch(createUser(user))
        setEmail('')
        setFirstname('')
        setLastname('')
        setPassword('')
    }

    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="modal">
            <div 
                className="register-background" 
                // onClick={handleBackgroundClick}
                >
            </div>
            <div className="register-modal">
                <div className="modal-header">
                    <button data-close-button className="close">&times;</button>
                    <div className="title-box"> 
                        <h2 className="signup-form">
                            Finish Signing Up
                        </h2>
                    </div>
                </div>
                <div className="body">
                    <form onSubmit={handleSignup}>
                        {/* <label> */}
                            <input 
                                className="email-input" 
                                type="text" 
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                            />   
                        {/* </label> */}
                        {/* <label> */}
                            <input 
                                className="firstname-input" 
                                type="text" 
                                onChange={e => setFirstname(e.target.value)}
                                placeholder="Firstname"
                            />   
                        {/* </label> */}
                        {/* <label> */}
                            <input 
                                className="lastname-input" 
                                type="text" 
                                onChange={e => setLastname(e.target.value)}
                                placeholder="Lastname"
                            />   
                        {/* </label> */}
                            <input 
                                className="lastname-input" 
                                type="password" 
                                onChange={e => setPassword(e.target.value)}
                                placeholder=""
                            />  
                        <button className="continue main">Continue</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default SignupForm