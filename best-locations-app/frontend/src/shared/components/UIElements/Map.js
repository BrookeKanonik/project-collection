import React, {useRef, useEffect} from "react";

import './Map.css'

const Map = props => {
    const mapRef = useRef(); //points to the div

    const {center,zoom} = props; //so we can add as dependencies later on in the code

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, { //second param is where we configure the map

            center: center, //center and zoom are dependencies, since we added center,zoom defined above, we can make props.zoom and props.center just center and zoom
            zoom: zoom
        });
    
        //below is how to render a marker
        new window.google.maps.Marker({position: center, map: map})
    }, [center,zoom]);



    return (
    <div 
    ref={mapRef} 
    className={`map ${props.className}`} 
    style={props.style}>
    </div>
    )
}

export default Map;

