import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import { useState } from "react"


const InitialForm = ({ loginOrSignup }) => {

    const [email, setEmail] = useState('')
    const [formState, setFormState] = useState('initial');

    const handleSubmit = e => {
        e.preventDefault()
        loginOrSignup()
        if (formState === 'login') {
            return <LoginForm />;
        } else if (formState === 'signup') {
            return <SignupForm />;
        } 
    }
    return (
        <div className="modal">
            <div 
                className="register-background" 
                // onClick={handleBackgroundClick}
                >
            </div>
            <div className="register-modal">
                <div class="modal-header">
                    <button data-close-button class="close">&times;</button>
                    <div className="title-box"> 
                        <h2 class="title">Log in or sign up</h2>
                    </div>
                </div>
                <div className="body">
                    <h1>Welcome to Airbnb</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input 
                                className="email-input" 
                                type="text" 
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                            />   
                        </label>
                        <button className="continue main">Continue</button>
                    </form>
                    <div className="spacer">
                        <div className="line"></div>
                        <div className="or-text">or</div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="quick-sign-up">
                    <form action="">
                        <button>
                            <div>[icon]</div>
                            <div className="main">Continue with Facebook</div>
                        </button>
                        <button>
                            <div>[icon]</div>
                            <div className="main">Continue with Google</div>
                        </button>
                        <button>
                            <div>[icon]</div>
                            <div className="main">Continue with Apple</div>
                        </button>
                        <button className="email">
                            <div>[icon]</div>
                            <div className="main">Continue with email</div>
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default InitialForm