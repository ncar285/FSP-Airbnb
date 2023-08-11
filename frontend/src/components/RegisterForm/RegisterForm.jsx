import "./RegisterForm.css"

import { deactivateSessionModal } from "../../store/uiReducer";
import { useDispatch, useSelector } from "react-redux"

// const RegisterForm = ( {closeModal} ) => {

//     const handleBackgroundClick = e => {
//         e.stopPropagation()
//         closeModal()
//     }

//     return (
//         <div className="modal">
//             <div className="modal-background" onClick={handleBackgroundClick}>

//             </div>
//             <div className="modal-foregrouund">
//                 <h2>Register Form</h2>

//             </div>
//         </div>

//     )
// }

// export default RegisterForm

const RegisterForm = () => {

    const dispatch = useDispatch();

    const display = useSelector(state => state.ui.sessionModal)

    const handleBackgroundClick = e => {
        e.stopPropagation()
        dispatch(deactivateSessionModal())
    }

    if (!display) return null

    return (
        <div className="modal">
            <div className="modal-background" onClick={handleBackgroundClick}>

            </div>
            <div className="modal-foreground">
                <h2>Register Form</h2>

            </div>
        </div>

    )
}

export default RegisterForm