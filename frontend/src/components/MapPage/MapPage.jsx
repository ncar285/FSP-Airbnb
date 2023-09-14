import { FaListUl } from "react-icons/fa"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Wrapper } from "@googlemaps/react-wrapper";
import ListingsMap from "./ListingsMap";
import './MapPage.css'

const MapPage = () => {

    const history = useHistory()

    const mapMode = () => {
        history.push('/')
    }


    return (

        <>
        <div className='full-screen-map-container'>
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
                <ListingsMap />
            </Wrapper>
        </div>

        <button className='toggle-map-button' onClick={mapMode}>
            Show list
            <FaListUl className='toggle-map-icon'/>
        </button>
        </>
    )

}

export default MapPage