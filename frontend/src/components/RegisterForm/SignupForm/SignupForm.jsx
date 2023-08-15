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
        <div className="body">
            <form onSubmit={handleSignup}>
                <input 
                    className="email-input" 
                    type="text" 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />   
                <input 
                    className="firstname-input" 
                    type="text" 
                    onChange={e => setFirstname(e.target.value)}
                    placeholder="Firstname"
                />   
                <input 
                    className="lastname-input" 
                    type="text" 
                    onChange={e => setLastname(e.target.value)}
                    placeholder="Lastname"
                />   
                <label >Password
                    <input 
                        className="lastname-input" 
                        type="password" 
                        onChange={e => setPassword(e.target.value)}
                        placeholder=""
                    />  
                </label>
                <button className="continue main">Continue</button>
            </form>
        </div>
    )

}

export default SignupForm