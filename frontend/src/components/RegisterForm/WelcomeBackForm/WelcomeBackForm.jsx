import profile from "../../../assets/user_pic-225x225.png"

const WelcomeBackForm = ({ email }) => {

    return (
        <>
            <div className="body">

                <div>(welcome-back form)</div>
                <div class="login-profile">
                    <img src={profile} alt="" />
                    {/* <div>{currentUser.email}</div> */}
                    <div class="user-email">{email}</div>
                    {/* <div class="user-email">nicocarlier13@gmail.com</div> */}
                </div>

                <form >
                    <button className="continue main">Continue</button>
                    <p>Not you? <a href="">Use another account</a></p>
                </form>
            </div>
                  
        </>
    )

}

export default WelcomeBackForm