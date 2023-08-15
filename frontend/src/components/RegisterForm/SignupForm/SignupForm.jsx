import { useDispatch } from "react-redux";
import { createUser } from "../../../store/usersReducer";
import { useState } from "react"
import "./SignupForm.css"

const SignupForm = ({userEmail, setUserEmail, deactivateRegisterModal}) => {

    const dispatch = useDispatch()

    const handleSignup = e => {
        e.preventDefault();
        const user = {
            email: userEmail,
            firstname,
            lastname,
            password
        }
        dispatch(createUser(user))
        setUserEmail('')
        setFirstname('')
        setLastname('')
        setPassword('')
    }

    // const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="body">
            <form onSubmit={handleSignup}>
                <div>(signup form)</div>
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
                    onChange={e => setUserEmail(e.target.value)}
                    placeholder="Email"
                />    
                
                <input 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />  
               
                <button className="continue main">Continue</button>
            </form>
        </div>
    )

}

export default SignupForm