import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/sessionsReducer"
import { fetchUserShow, selectUserData } from "../../store/usersReducer"
import { useEffect } from "react"
import BookingItem from "./BookingItem/BookingItem"

const AccountPage = () => {

    const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    const data = useSelector(selectUserData)

    const bookings  = useSelector(state => Object.values(state?.bookings))
    useEffect(() => {
        dispatch(fetchUserShow(user.id));
    }, [dispatch]);

    // const bookings = data.bookings || null

    return (
        <>
            <div>Welcome, {data.firstname}</div>

            <div className="users-bookings-show">
                <div>Bookings</div>
                <div>
                    <div>Here are your upcoming bookings:</div>
                </div>
                <div className='bookings-container'>
                    {bookings &&
                    <div>{Object.values(bookings).map((booking)=><BookingItem booking={booking} /> )}</div>
                    }
                </div>
            </div>
            
        </>
    )

}


export default AccountPage