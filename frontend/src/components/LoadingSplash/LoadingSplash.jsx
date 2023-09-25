import "./LoadingSplash.css"

const LoadingItem = (key) => {
    return (
        <div key={key} className="item">
            <div className="main-image"></div>
            <div className="text-fields">
                <div className="block-1">
                    <div className="left-column">
                        <div className="filler aa"></div>
                        <div className="filler ab"></div>
                        <div className="filler ac"></div>
                    </div>
                </div>
                <div className='right-column'>
                        <div className="filler ba"></div>
                </div>
                <div className="block-2">
                    <div className="filler ad"></div>
                </div>
            </div>
        </div>
    );
}

const LoadingPage = () => {

    return (
        <div className="loading-splash">
        {Array.from({ length: 20}, (_, index) => (
            LoadingItem(index)
        ))}
        </div>
    );
}
  
export default LoadingPage