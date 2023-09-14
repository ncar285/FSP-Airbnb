import { useEffect, useRef, useState } from 'react'
import './ListinigsMap.css'


const ListingsMap = () => {

    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    const myLatLng = {lat: 37.755810, lng: -122.416890}
    const mapOptions = {zoom: 4, center: myLatLng}

    const markers = useRef(null)


    
    useEffect(()=>{
        if (!map){
            const newMap = new google.maps.Map(mapRef.current, ...mapOptions)
            setMap( newMap)
        }
    },[map])

    return  (
        <div ref={mapRef}>
                Map
        </div>
    )

}

export default ListingsMap