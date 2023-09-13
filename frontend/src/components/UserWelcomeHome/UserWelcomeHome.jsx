import './UserWelcomeHome.css'

const UserWelcomeHome = ({data}) => {


    return  (

        <div className="profile-block">
            <div>Welcome, {data.firstname}</div>
            <div className="users-bookings-show">
                <div>Bookings</div>
                <div>
                    <div>Here are your upcoming bookings:</div>
                </div>
            </div>
        </div>

    )
     
}

export default UserWelcomeHome