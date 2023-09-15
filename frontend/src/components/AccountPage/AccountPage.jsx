import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/sessionsReducer"
import { fetchUserShow, selectUserData } from "../../store/usersReducer"
import { useEffect } from "react"
import BookingItem from "../BookingItem/BookingItem"
import { getBookings } from "../../store/bookingsReducer"
import UserWelcomeHome from "../UserWelcomeHome/UserWelcomeHome"
import OldBooking from "../BookingItem/OldBooking"
import './AccountPage.css'

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

                    <div className="sticky-container">

                    <UserWelcomeHome data={data}/>
                    

                    <div className="personal-info">
                        <div className="pi-header">Personal Info</div>
                        <div className="info-block">
                            <div className="ibhd">
                                <p className="ibhd-hed">Legal Name</p>
                                <p>{`${user.firstname} ${user.lastname}`}</p>
                            </div>
                            <div class="tooltip-wrapper">
                                <div className="ibhde">Edit</div>
                                <div class="tooltip">Can't edit demo user, sign up to use this feature</div>
                            </div>
                        </div>
                        <div className="pi-spacer"></div>
                        <div className="info-block">
                            <div className="ibhd">
                                <p className="ibhd-hed">Email address</p>
                                <p>{`${user.email}`}</p>
                            </div>
                            <div class="tooltip-wrapper">
                                <div className="ibhde">Edit</div>
                                <div class="tooltip">Can't edit demo user, sign up to use this feature</div>
                            </div>
                        </div>

                        </div>

                    </div>
                </div>

                <div className="account-right">
                    <div className="trips-header">Trips</div>

                    { currentBookings && 
                        <div className="booking-upcoming">Current accommodation</div>
                    }

                    <div className='bookings-container'>
                        {currentBookings &&
                        <div>{Object.values(currentBookings).map((booking)=><BookingItem booking={booking} type={"current"}/> )}</div>
                        }
                    </div>

                    { upcomingsBookings ? 
                        <div className="booking-upcoming">Upcoming reservations</div>
                        :
                        <div className="booking-upcoming">You have no upcoming reservations</div>
                    }
                    <div className='bookings-container'>
                        {upcomingsBookings &&
                        <div>{Object.values(upcomingsBookings).map((booking)=><BookingItem booking={booking} type={"upcoming"}/> )}</div>
                        }
                    </div>

                   

                </div>

                

            </div>

            <div className="past-reservations-lower">
                { previousBookings &&
                    <div className="booking-upcoming">Where you've been</div>
                }

                <div className='bookings-container-lower'>
                    {previousBookings &&
                        <div className="obi-items-list">{Object.values(previousBookings).map((booking)=>
                            <OldBooking booking={booking}/> )}</div>
                    }
                </div>
            </div>

            
        </>
    )

}


export default AccountPage