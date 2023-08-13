import { useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import { activateRegisterModal} from "../../store/uiReducer";
import { useDispatch } from "react-redux"



const Splash = () => {

    const [showRegister] = useState(false)

    const dispatch = useDispatch();

    return (
        <>
            <h2>Splash</h2>
            <button onClick={() => dispatch(activateRegisterModal())}>Create an Account</button>
            {showRegister && (
                <RegisterForm closeModal={true}/>
            )}
        </>
    )
}

export default Splash


// // Example:
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import ReportIndexItem from './ReportIndexItem';
// import { getReports, fetchReports } from '../store/reports'

// const ReportIndex = () => {
//     const dispatch = useDispatch()
//     useEffect(()=> {
//         dispatch(fetchReports())
//     }, [])
//     const reports = useSelector(getReports)
//     return (
//         <>
//             <div>
//                     <ul>
//                         {
//                         reports.map(
//                             (report)=>{
//                         return (<ReportIndexItem key={report.id} report={report}/>)
//                         })
//                     }
//                     </ul>
//             </div>
//             <Link to='/reports/new'>New Report</Link>
//         </>
//     )
// }
// export default ReportIndex