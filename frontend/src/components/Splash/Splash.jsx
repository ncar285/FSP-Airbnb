import { useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import { activateSessionModal } from "../../store/uiReducer";
import { useDispatch } from "react-redux"



const Splash = () => {

    const [showRegister] = useState(false)

    const dispatch = useDispatch();

    return (
        <>
            <h2>Splash</h2>
            <button onClick={() => dispatch(activateSessionModal())}>Create an Account</button>
            {showRegister && (
                <RegisterForm closeModal={true}/>
            )}
        </>
    )
}

export default Splash