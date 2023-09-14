import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMapIndex } from '../../store/listingsReducer'
import './ListingsMap.css'


const ListingsMap = () => {
    const dispatch = useDispatch();
    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    const mapOptions = {zoom: 4, center: {lat: 35, lng: -70}}
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
                    title: `${listing.price}`,
                    label: {
                        text: `$${listing.price}`,  // Price
                        color: 'white',  // Text color
                        fontSize: '14px',  // Font size
                        fontWeight: 'bold'  // Font weight
                    },
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,  // Shape
                        scale: 10,  // Size
                        strokeColor: 'blue',  // Border color
                        strokeWeight: 4,  // Border thickness
                        fillColor: 'blue',  // Background color
                        fillOpacity: 1  // Opacity
                    }
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

}

export default ListingsMap