import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/sessionsReducer"
import { fetchUserShow, selectUserData } from "../../store/usersReducer"
import { useEffect, useState } from "react"
import BookingItem from "../BookingItem/BookingItem"
import { deleteBooking, getBookings } from "../../store/bookingsReducer"
import UserWelcomeHome from "../UserWelcomeHome/UserWelcomeHome"
import OldBooking from "../BookingItem/OldBooking"
import { RxCross2 } from 'react-icons/rx'

import './AccountPage.css'
import FlatBookingItem from "../BookingItem/FlatBookingItem"
import EditForm from "./EditForm"

const AccountPage = () => {

    const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    const data = useSelector(selectUserData)
    const bookings  = useSelector(getBookings)


    const [cancelModal, setCancelModal] = useState(false);
    const [modifyModal, setModifyModal] = useState(false);
    const [modalBooking, setModalBooking] = useState(null);




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
    const upcomingsBookings = Object.values(bookings).filter(booking => new Date(booking.startDate) > today).sort(booking => booking.startDate)
    const previousBookings = Object.values(bookings).filter(booking => new Date(booking.endDate) < today).sort(booking => booking.startDate)


    return (
        <>

            {modifyModal &&
                <div className='basic-modal-background' 
                onClick={()=>{
                    setModalBooking(null)
                    setModifyModal(false)}}
                >
                    <div className='basic-modal' onClick={(e) => e.stopPropagation()}>
                        <div className="modify-title">
                            <button className='close-button'
                                onClick={()=>{
                                    setModalBooking(null)
                                    setModifyModal(false)}}
                                >
                                <RxCross2/>
                            </button>
                            <p className="header-1 modify-cancel">Edit your upcoming booking</p>
                        </div>
                        
                        <div className='modify-modal-container'>
                            <div>
                                <FlatBookingItem booking={modalBooking}/>
                            </div>

                            <div className="standard-spacer"></div>

                            {/* <p className="subheader">Change the dates</p> */}
                            <div><EditForm booking={modalBooking}/></div>

                        </div>
                    </div>
                </div>
            }


            {cancelModal &&
                <div className='basic-modal-background' onClick={()=>setCancelModal(false)}>
                    <div className='basic-modal listing-description' onClick={(e) => e.stopPropagation()}>
                        <div className="cancel-title">
                            <button className='close-button'
                                onClick={()=>{
                                    setModalBooking(null)
                                    setCancelModal(false)}
                                }
                                >
                                <RxCross2/>
                            </button>
                            <p className="header-1 modify-cancel">Are you sure you want to cancel this booking?</p>
                        </div>

        
                        <div className='cancel-modal-container'>
                            <div>
                                <FlatBookingItem booking={modalBooking}/>
                            </div>

                            <div className="standard-spacer"></div>
                            <p>cancel buttons goes here..</p>
                        </div>
                    </div>
                </div>
            }

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
                        <div className="subheading">Current accommodation</div>
                    }

                    <div className='bookings-container'>
                        {currentBookings &&
                        <div>{Object.values(currentBookings).map((booking)=>
                        <BookingItem booking={booking} type={"current"}/> )}</div>
                        }
                    </div>

                    { upcomingsBookings ? 
                        <div className="subheading">Upcoming reservations</div>
                        :
                        <div className="subheading">You have no upcoming reservations</div>
                    }
                    <div className='bookings-container'>
                        {upcomingsBookings &&
                        <div>{Object.values(upcomingsBookings).map((booking)=>
                        <BookingItem booking={booking} 
                        type={"upcoming"}
                        modalBooking = {modalBooking}
                        setModalBooking = {setModalBooking}
                        cancelModal = {cancelModal} 
                        setCancelModal = {setCancelModal}
                        modifyModal = {cancelModal} 
                        setModifyModal = {setModifyModal}/> )}</div>
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