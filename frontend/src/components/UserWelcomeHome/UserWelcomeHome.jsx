import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/sessionsReducer'
import { CgProfile } from "react-icons/cg"
import './UserWelcomeHome.css'

const UserWelcomeHome = ({data}) => {

    const currentUser = useSelector(getCurrentUser)
    const name = currentUser.id === 1 ? 'Tom And Jerry' : currentUser.firstname
    const reviewCount = data && data.reviews ? Object.values(data.reviews).length : null

    let createdAt = new Date(data.createdAt);
    if (data.id === 1) {
        createdAt.setDate(createdAt.getDate() - (103 * 7));
    }
    const currentDate = new Date();
    const diffDays = currentDate.getDate() - createdAt.getDate();
    const diffMonths = currentDate.getMonth() - createdAt.getMonth();
    const diffYears = currentDate.getYear() - createdAt.getYear() ;


    // const timeOnFbnb = diffYears <= 0 ? (diffMonths <= 0 ? diffDays : diffMonths) : diffYears
    const timeOnFbnb = diffYears > 0 ? diffYears : (diffMonths > 0 ? diffMonths : diffDays)
    const TOFBNBUnit = diffYears > 0 ? 'Year' : (diffMonths > 0 ? 'Month' : 'Day');
    const TOFBNBPlural = timeOnFbnb > 1 ? 's' : '';
   

    // const timeOnFbnb = data.id === 1 ? new Date(data.createdAt) : new Date(data.createdAt)

    
    return  (

        <div className="profile-block">
            <div className='PB-left-side'>
                <div className="user-profile-image">{currentUser?.photoUrl ? 
                    <img src={currentUser.photoUrl} alt=""/> : 
                    <CgProfile className="PB-default-profile"/>}
                </div>
                <div className='PB-user-name'>{name}</div>
                <p>Guest</p>
            </div>
            <div className='PB-right-side'>
                <div className='PB-RHS-containier'>
                    <div className='show-review-dets'>
                        {reviewCount &&
                            <div className='PB-val'>{reviewCount}</div>
                        }
                        <p>Reviews</p>
                    </div>
                    <div className="booking-item-spacer"></div>

                    <div className='show-time-on-fbnb'>
                        {timeOnFbnb &&
                            <div className='PB-val'>{timeOnFbnb}</div>
                        }
                        <p>{`${TOFBNBUnit}${TOFBNBPlural} on Fairbnb`}</p>
                    </div>
                </div>
            </div>
        </div>

    )
     
}

export default UserWelcomeHome