import { FaListUl } from "react-icons/fa"
import './MapPage.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const MapPage = () => {

    const history = useHistory()

    const mapMode = () => {
        history.push('/')
    }

    return (

        <>
        <div className='full-screen-map-container'>




        </div>

        <button className='toggle-map-button' onClick={mapMode}>
            Show list
            <FaListUl className='toggle-map-icon'/>
        </button>
        </>
    )

}

export default MapPage