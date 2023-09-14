import { useEffect, useRef, useState } from 'react'
import './ListinigsMap.css'
import { useSelector } from 'react-redux'
import { selectMapData } from '../../store/listingsReducer'


const ListingsMap = () => {

    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    const myLatLng = {lat: 37.755810, lng: -122.416890}
    const mapOptions = {zoom: 4, center: myLatLng}

    const markers = useRef(null)

    // const mapData = await fetchMapIndex()

    const mapData = useSelector(selectMapData)


    useEffect(()=>{
        const getData = async () => {
            await fetchMapIndex()
        }
        if (!markers){
            getData()
        }
    },[])



    
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