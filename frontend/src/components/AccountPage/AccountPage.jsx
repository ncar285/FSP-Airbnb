import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/sessionsReducer"
import { fetchUserShow, selectUserData } from "../../store/usersReducer"
import { useEffect } from "react"
import BookingItem from "../BookingItem/BookingItem"
import { getBookings } from "../../store/bookingsReducer"
import './AccountPage.css'
import UserWelcomeHome from "../UserWelcomeHome/UserWelcomeHome"

const AccountPage = () => {

    const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    const data = useSelector(selectUserData)
    const bookings  = useSelector(getBookings)


    useEffect(() => {
        if (user){
            dispatch(fetchUserShow(user.id));
        }
    }, [dispatch, user]);


    if (!user) {
        return <p>loading</p>;
    }

    return (
        <>
            <div className="account-show-page">

                <div className="account-left">
                    <UserWelcomeHome data={data}/>
                </div>

                <div className="account-right">
                    <div className="trips-header">Trips</div>

                    { bookings ? 
                        <div className="booking-upcoming">Upcoming reservations</div>
                        :
                        <div className="booking-upcoming">You have no pcoming reservations</div>
                    }
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