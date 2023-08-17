import { useDispatch } from "react-redux";
// import { createUser } from "../../../store/usersReducer";
import { createUser } from "../../../store/sessionsReducer";
import { useState } from "react"
import "./SignupForm.css"

const SignupForm = ({userEmail, setUserEmail, deactivateRegisterModal}) => {

    const dispatch = useDispatch()

    const handleSignup = async e => {
        e.preventDefault();
        const user = {
            email: userEmail,
            firstname,
            lastname,
            password
            // ,
            // photo
        }
        await dispatch(createUser(user))
        setUserEmail('')
        setFirstname('')
        setLastname('')
        setPassword('')
        await dispatch(deactivateRegisterModal())
    }

    // const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    // const [photo, setPhoto] = useState(null)

    // const handleFile = e => {
    //     console.log("handling file")
    //     const file = e.currentTarget.files[0]
    //     console.log(file)
    //     setPhoto(file)
    // }

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
                    placeholder={userEmail}
                />    
                
                <input 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />  

                {/* <input 
                    type="file" 
                    onChange={handleFile}
                /> */}
               
                <button className="continue main">Continue</button>
            </form>
        </div>
    )

}

export default SignupForm