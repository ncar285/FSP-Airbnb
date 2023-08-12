import "./NavBar.css"
import logo from "../../assets/airbnb.svg"
import sButton from "../../assets/s-button.png"

const navBar = () => {

    return (
        <div className="bar">
            <div className="innerBar">
                <div className="nav-item left">
                    <img id="logo" src={logo} alt="fairbnb-logo" />
                    {/* <div><img/></div> */}
                    
                </div>
                <div className="nav-item middle">
                    <div className="search-bar">
                        <div class="search-filters">
                            <div class="bold"><p>Anywhere</p></div>
                            <div class="bold"><p>Any week</p></div>
                            <div id="guests"><p>Add guests</p></div>
                        </div>
                        <div class="s-button">
                            <img src={sButton} alt="" />
                        </div>

                    </div>
                </div >
                <div className="nav-item right">
                    <div className="register">

                    </div>
                </div>


            </div>
        </div>
    )

}

export default navBar