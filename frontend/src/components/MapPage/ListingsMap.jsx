import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListings, selectListing, selectListings } from '../../store/listingsReducer'
import ListingItem from '../Splash/ListingItem';
import ReactDOM from 'react-dom';
import './ListingsMap.css'
import { fetchMapIndex } from '../../store/mapReducer';


const ListingsMap = () => {
    const dispatch = useDispatch();
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const mapOptions = {zoom: 4, center: {lat: 35, lng: -70}};
    const markers = useRef({});
    const [infoWindow, setInfoWindow] = useState(null);
    const [selectedListing, setSelectedListing] = useState(null);
    const selectedListingRef = useRef(selectedListing);
    const mapData = useSelector(state => state.mapData);
    const listings = useSelector(state => state.listings);
    const listingsRef = useRef(null);
    
    useEffect(() => {
        selectedListingRef.current = selectedListing;
    }, [selectedListing]);

    useEffect(() => {
        listingsRef.current = listings;
    }, [listings]);

    useEffect(() => {
        dispatch(getListings())
        console.log('Listings after dispatch:', listings);
    },[])

    useEffect(() => {
        dispatch(fetchMapIndex());
    }, []);

    useEffect(()=>{
        if (!map){
            const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
            setMap( newMap)
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


    const renderToString = (reactComponent) => {
        const div = document.createElement('div');
        ReactDOM.render(reactComponent, div);
        return div.innerHTML;
    };

    const showListingInfoWindow = (marker) => {
        const listingArray = Object.values(listingsRef.current)
        const obj = listingArray.filter(listing=>listing.id === marker.id)[0]
        const contentString = renderToString(<ListingItem listing={obj} />);
        const newInfoWindow = new window.google.maps.InfoWindow({
            content: contentString,
            position: marker.getPosition(),
        });
        newInfoWindow.open(map, marker);
        setInfoWindow(newInfoWindow);
    }


    const toggleColor = (marker) => { 
        const oldSelectedListing = selectedListingRef.current;
        const oldMarker = markers.current[oldSelectedListing];
        if (oldSelectedListing !== null) {
            unselectMarker(oldMarker);
        }
    
        if (oldSelectedListing !== marker.id) {
            selectMarker(marker);
            if (infoWindow) {
                infoWindow.close();
            }

            showListingInfoWindow(marker);

       
        } else {
            setSelectedListing(null);
            if (infoWindow) {
                infoWindow.close();
            }
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


    return  (
      
        <div 
            className='map-object'
            ref={mapRef}>     
        </div>
  

    )

}

export default ListingsMap