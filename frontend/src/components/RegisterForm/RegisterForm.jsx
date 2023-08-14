import "./RegisterForm.css"

import { deactivateRegisterModal } from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"

// import { useState } from "react"
// import './TeaForm.css'
// import { useDispatch, useSelector } from "react-redux"
// import { createTea, receiveTea } from "../../store/teasReducer";

const RegisterForm = props => {

    const dispatch = useDispatch();

    const display = useSelector(state => state.ui.registerModal)

    const handleBackgroundClick = e => {
        e.stopPropagation()
        dispatch(deactivateRegisterModal())
    }

    if (!display) return null

    return (
        <div className="modal">
            <div className="register-background" onClick={handleBackgroundClick}>

            </div>
            <div className="register-modal">
                <div class="modal-header">
                    <button data-close-button class="close">&times;</button>
                    <div className="title-box"> <h2 class="title">Log in or sign up</h2></div>
                   
                </div>
                <div className="body">
                    <h1>Welcome to Airbnb</h1>
                    <form action="">
                        <label htmlFor="">Country/Region
                            <input type="text" placeholder="United States (+1)"/>   
                        </label>
                        <label htmlFor="">
                            <input type="text" placeholder="Phone number "/>   
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

export default RegisterForm