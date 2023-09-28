import './LoadingAccountPage.css'

const LoadingAccountPage = () => {
    return  (
        <div className="loading-account-container">
            <div className='lac-left'>
                <div className='lac-left-inner'></div>
                <div className='lac-right-header'></div>
                <div className='lac-right-subheader'></div>
                <div className='lac-right-subheader'></div>
                <div className='lac-right-header'></div>
                <div className='lac-right-subheader'></div>
                <div className='lac-right-subheader'></div>
            </div>

            <div className='lac-right'>
                <div className='lac-right-header'></div>
                <div className='lac-right-subheader'></div>
                <div className='lac-loading-booking'></div>
                <div className='lac-right-subheader'></div>
                <div className='lac-loading-booking'></div>
                <div className='lac-loading-booking'></div>
                <div className='lac-loading-booking'></div>
            </div>


        </div>
    )
}

export default LoadingAccountPage