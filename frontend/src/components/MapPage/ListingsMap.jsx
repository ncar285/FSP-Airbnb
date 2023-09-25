import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListings } from '../../store/listingsReducer'
import ListingItem from '../Splash/ListingItem';
import ReactDOM from 'react-dom/client';
import './ListingsMap.css'
import { fetchMapIndex } from '../../store/mapReducer';


const ListingsMap = () => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const mapOptions = {zoom: 4, center: {lat: 35, lng: -70}};
    const mapData = useSelector(state => state.mapData);
    const listings = useSelector(state => state.listings);
    const [map, setMap] = useState(null);
    const [selectedListing, setSelectedListing] = useState(null);
    const infoWindowRef = useRef(null);
    const markers = useRef({});
    const selectedListingRef = useRef(selectedListing);
    const listingsRef = useRef(null);
    
    useEffect(() => {
        selectedListingRef.current = selectedListing;
    }, [selectedListing]);

    useEffect(() => {
        listingsRef.current = listings;
    }, [listings]);

    useEffect(() => {
        dispatch(getListings())
        dispatch(fetchMapIndex());
    },[])

    useEffect(()=>{
        if (!map){
            const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
            setMap(newMap)
        }
    },[map])

    const svgMarker = {
        path: "M -8 -5 L 8 -5 A 5 5 0 0 1 8 5 L -8 5 A 5 5 0 0 1 -8 -5 Z",
        scale: 2,
        strokeColor: 'white',
        fillColor: 'white',
        fillOpacity: 1,
        strokeWeight: 1,
        rotation: 0,
    };

    useEffect(()=>{
        if (mapData && map){
            const mapListings = Object.values(mapData)
            mapListings.forEach((listing => {
                const marker = new window.google.maps.Marker({
                    position: {lat: listing.latitude, lng: listing.longitude},
                    map,
                    title: `${listing.price}`,
                    label: {
                        text: `$${listing.price}`,
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    },
                    icon: svgMarker,
                    id: listing.id
                });
                marker.addListener("click", ()=>toggleColor(marker));
                markers.current[listing.id] = marker
            }))
        }
    },[mapData, map])
    
    const showListingInfoWindow = (marker) => {
        const listingArray = Object.values(listingsRef.current)
        const obj = listingArray.filter(listing=>listing.id === marker.id)[0]
        const div = document.createElement('div');
        ReactDOM.createRoot(div)
        .render(
            <div className="info-popup">
                <ListingItem listing={obj} />
            </div>
        )
        
        const newInfoWindow = new window.google.maps.InfoWindow({
          content: div,
          position: marker.getPosition(),
        });
        
        newInfoWindow.open(map, marker);
        infoWindowRef.current = newInfoWindow;
      };


    const closeInfoWindow = () => {
        if (infoWindowRef.current) {
            infoWindowRef.current.close();
            infoWindowRef.current = null;
        }
    }

    const selectMarker = (marker) => {
        setSelectedListing(marker.id);
        marker.setLabel({
            ...marker.getLabel(),
            color: 'white',
            fontSize: '18px',
        });
        marker.setIcon({
            ...marker.getIcon(),
            fillColor: 'black',
            strokeColor: 'black',
            scale: 2.5,
        });
    }

    const unselectMarker = (marker) => {
        marker.setLabel({
            ...marker.getLabel(),
            color: 'black',
            fontSize: '14px',
        });
        marker.setIcon({
            ...marker.getIcon(),
            fillColor: 'white',
            strokeColor: 'white',
            scale: 2,
        });
    }

    const toggleColor = (marker) => { 
        const oldSelectedListing = selectedListingRef.current;
        const oldMarker = markers.current[oldSelectedListing];
        if (oldSelectedListing !== null) {
            unselectMarker(oldMarker);
            closeInfoWindow(oldMarker)
        }
        if (oldSelectedListing !== marker.id) {
            selectMarker(marker);
            showListingInfoWindow(marker);

        } else {
            setSelectedListing(null);
        }
    }



    return  (
        <div 
            className='map-object'
            ref={mapRef}>     
        </div>
    )

}

export default ListingsMap