const LoginForm = ( {currentUser} ) => {

    return (
        <>
            <div>
                <div className="modal">
                    <div 
                        className="register-background" 
                        // onClick={handleBackgroundClick}
                        >
                    </div>

                    <div className="register-modal">
                        <div class="modal-header">
                            <button data-close-button class="close">&times;</button>
                            <div className="title-box">
                                <h2 class="title">Welcome back, {currentUser.firstname}</h2>
                            </div>
                        </div>
                        <div className="body">
                            <form>
                                <label> Password:
                                    <input type="text" />
                                </label>
                                <button className="continue main">Continue</button>
                                <p>Not you? <a href="">Use another account</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default LoginForm