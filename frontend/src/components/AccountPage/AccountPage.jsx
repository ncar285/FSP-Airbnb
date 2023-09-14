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

    const today = new Date()
    const currentBookings = Object.values(bookings).filter(booking => new Date(booking.startDate) <= today && new Date(booking.endDate) >= today)
    // .sort(booking => booking.startDate)
    const upcomingsBookings = Object.values(bookings).filter(booking => new Date(booking.startDate) > today).sort(booking => booking.startDate)
    const previousBookings = Object.values(bookings).filter(booking => new Date(booking.endDate) < today).sort(booking => booking.startDate)

    return (
        <>
            <div className="account-show-page">

                <div className="account-left">
                    <UserWelcomeHome data={data}/>
                </div>

                <div className="account-right">
                    <div className="trips-header">Trips</div>

                    { currentBookings && 
                        <div className="booking-upcoming">Current accommodation</div>
                    }

                    <div className='bookings-container'>
                        {currentBookings &&
                        <div>{Object.values(currentBookings).map((booking)=><BookingItem booking={booking} /> )}</div>
                        }
                    </div>

                    { upcomingsBookings ? 
                        <div className="booking-upcoming">Upcoming reservations</div>
                        :
                        <div className="booking-upcoming">You have no upcoming reservations</div>
                    }
                    <div className='bookings-container'>
                        {upcomingsBookings &&
                        <div>{Object.values(upcomingsBookings).map((booking)=><BookingItem booking={booking} /> )}</div>
                        }
                    </div>

                    { previousBookings &&
                        <div className="booking-upcoming">Past reservations</div>
                    }
                    <div className='bookings-container'>
                        {previousBookings &&
                        <div>{Object.values(previousBookings).map((booking)=><BookingItem booking={booking} /> )}</div>
                        }
                    </div>

                </div>

            </div>
            
        </>
    )

}


export default AccountPage