import "./RegisterForm.css"

import { deactivateRegisterModal } from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"

const RegisterForm = () => {

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
                <h2>Register Form</h2>

            </div>
        </div>

    )
}

export default RegisterForm