import React from 'react'

import "../../assets/style/style.css";
import { useCallback, useEffect, useState } from "react";



function App() {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false); // hide menu

    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setShow(true);
        },
        [setAnchorPoint]
    );

    const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });

    return (
        <div className="app">
            <h1>Right click somewhere on the page..</h1>
            {show ? (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x
                    }}
                >
                    <li>Create Node</li>
                    <li>Cut</li>
                    <li>Copy</li>
                    <li>Paste</li>
                    <hr className="divider" />
                    <li>Refresh</li>
                    <li>Exit</li>
                </ul>
            ) : (
                <> </>
            )}
        </div>
    );
}
export default App;

// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//     minWidth: '500px',
//     height: '500px',

// };

// const center = {
//     lat: 29.749,
//     lng: -95.358
// };

// function Map() {
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: "AIzaSyBg7_yys3sc_lunTZ_5pPaAl5dAk48PHMY"
//     })

//     const [map, setMap] = React.useState(null)

//     const onLoad = React.useCallback(function callback(map) {
//         const bounds = new window.google.maps.LatLngBounds(center);
//         map.fitBounds(bounds);
//         setMap(map)
//     }, [])

//     const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//     }, [])

//     return isLoaded ? (
//         <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={5}
//             onLoad={onLoad}
//             onUnmount={onUnmount}>
//             { /* Child components, such as markers, info windows, etc. */}
//             <></>
//         </GoogleMap>
//     ) : <></>
// }

// export default React.memo(Map)