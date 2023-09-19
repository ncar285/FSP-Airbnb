import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMapIndex, selectListing } from '../../store/listingsReducer'
import './ListingsMap.css'
import ListingItem from '../Splash/ListingItem'


const ListingsMap = () => {
    const dispatch = useDispatch();
    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    const mapOptions = {zoom: 4, center: {lat: 35, lng: -70}}
    const markers = useRef({})
    const mapData = useSelector(state => state.listings.mapData)

    const [infoWindow, setInfoWindow] = useState(null);

    const [selectedListing, setSelectedListing] = useState(null)

    const selectedListingRef = useRef(selectedListing);

    const selectedListingObj = useSelector(selectListing(selectedListing))

    useEffect(() => {
        selectedListingRef.current = selectedListing;
    }, [selectedListing]);

    // useEffect(() => {
    //     const selectedListingObj = useSelector(selectListing(selectedListing));
    // }, [selectedListing]);

    // console.log(selectedListing)
    console.log("main document!",selectedListing)
    console.log('main doc, selected listing object: ', selectedListingObj)

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
            const listings = Object.values(mapData)
            listings.forEach((listing => {
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


    const toggleColor = (marker) => { 
        const oldSelectedListing = selectedListingRef.current;
        const oldMarker = markers.current[oldSelectedListing];
        if (oldSelectedListing !== null){
            if (oldSelectedListing === marker.id){
                // we are unselecting (double click)
                unselectMarker(oldMarker)
                setSelectedListing(null);
            }else {
                // we are unselecting the old and selecting the new
                unselectMarker(oldMarker)
                selectMarker(marker)
            }
        } else {
            selectMarker(marker)
        }



        if (selectedListing) {
            if (infoWindow) {
              infoWindow.close();
            }
            const contentString = <ListingItem className="listing-map-preview"/>;
            const newInfoWindow = new window.google.maps.InfoWindow({
              content: contentString,
              position: marker.getPosition(),
            });
            newInfoWindow.open(map, marker);
            setInfoWindow(newInfoWindow);
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



      
    window.initMap = map;


    return  (
        <>
        <div 
            className='map-object'
            ref={mapRef}>     
        </div>
        {/* <div className='map-listing-preview basic-modal'>
            <p>{selectedListingObj ? selectedListingObj.city : ''}</p>
        </div> */}
        </>

    )

}

export default ListingsMap