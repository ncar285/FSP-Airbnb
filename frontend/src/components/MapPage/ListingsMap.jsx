import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMapIndex } from '../../store/listingsReducer'
import './ListingsMap.css'


const ListingsMap = () => {
    const dispatch = useDispatch();
    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    // const myLatLng = {lat: 37.755810, lng: -122.416890}
    const mapOptions = {zoom: 4, center: {lat: 37.755810, lng: -122.416890}}
    const markers = useRef({})
    const mapData = useSelector(state => state.listings.mapData)

    useEffect(() => {
        dispatch(fetchMapIndex());
    }, []);

    useEffect(()=>{
        if (!map){
            const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
            setMap( newMap)
        }
    },[map])

    useEffect(()=>{
        if (mapData && map){
            const listings = Object.values(mapData)
            listings.forEach((listing => {
                const marker = new window.google.maps.Marker({
                    position: {lat: listing.latitude, lng: listing.longitude},
                    map,
                    title: listing.price
                });
                markers.current[listings.id] = marker
            }))
        }
    },[mapData, map])

    return  (
        <div 
            className='map-object'
            ref={mapRef}>
                
        </div>
    )


    // return  (
    //     <div ref={mapRef}>
    //             map
    //     </div>
    // )

}

export default ListingsMap