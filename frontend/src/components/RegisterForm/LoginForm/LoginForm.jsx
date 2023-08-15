import { useDispatch } from "react-redux"
import profile from "../../../assets/user_pic-225x225.png"
import "./LoginForm.css"
import { login } from "../../../store/sessionsReducer"
import { useState } from "react"


const LoginForm = ( {userEmail, deactivateRegisterModal}) => {

    console.log("YO YO YO ====", userEmail)

    const dispatch = useDispatch();

    const [userCredentials, setUserCredentials] = useState({password: ''})

    const handleSubmit = async e => {
        e.preventDefault();

        const newUser = {
            email: userEmail,
            password: userCredentials.password
        }
        // debugger
        const res = dispatch(login(newUser))
        if (res.ok){
            dispatch(deactivateRegisterModal());
        } else {
            console.log(newUser)
            console.log('ERROR LOGGING IN => CREDENTIALS')
        }
    }

    return (
        <>
            {/* <h1>[welcome back in the title]</h1> */}
            <div className="body">
                
                <div>(login form)</div>
                <div className="login-profile">
                    <img src={profile} alt="" />
                    <div className="user-email">{userEmail}</div>
                    {/* <div class="user-email">nicocarlier13@gmail.com</div> */}
                </div>
            
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        onChange={e => setUserCredentials({password: e.target.value})}
                        placeholder="Password"
                    />  
                    <button className="continue main">Continue</button>
                    <p>Not you? <a href="">Use another account</a></p>
                </form>
            </div>
        </>
    )

}

export default LoginForm