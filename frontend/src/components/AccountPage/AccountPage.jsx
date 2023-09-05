import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/sessionsReducer"
import { fetchUserShow, selectUserData } from "../../store/usersReducer"
import { useEffect } from "react"
import BookingItem from "./BookingItem/BookingItem"
import { getBookings } from "../../store/bookingsReducer"
import './AccountPage.css'

const AccountPage = () => {

    const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    const data = useSelector(selectUserData)
    const bookings  = useSelector(getBookings)
    useEffect(() => {
        dispatch(fetchUserShow(user.id));
    }, [dispatch]);

    // const bookings = data.bookings || null


    // // !hide while being built for CV
    // const notBuilt = true
    // if (notBuilt){
    //     return (
    //         <div>
    //             Sorry, this page is under construction!
    //         </div>
    //     )
    // }


    return (
        <>
            <div className="account-show-page">

                <div className="account-left">
                    <div className="profile-block">
                        <div>Welcome, {data.firstname}</div>
                        <div className="users-bookings-show">
                            <div>Bookings</div>
                            <div>
                                <div>Here are your upcoming bookings:</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="account-right">
                    <div className="trips-header">Trips</div>
                    <div className="booking-upcoming">Upcoming reservations</div>
                    <div className='bookings-container'>
                        {bookings &&
                        <div>{Object.values(bookings).map((booking)=><BookingItem booking={booking} /> )}</div>
                        }
                    </div>

                </div>

            </div>
            
        </>
    )

}


export default AccountPage