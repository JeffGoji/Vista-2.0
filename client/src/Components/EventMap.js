import React,{ useState } from "react";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useJsApiLoader, InfoBox, GoogleMap, Circle } from "@react-google-maps/api";

{/*function Menu() {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
      }}
      style={{ height: "600px" }} className="border rounded-2">


      Right click to open context menu

      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
      >
        <MenuItem>Create Node</MenuItem>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </ControlledMenu>
    </div>
  );
}

export default EventMap;*/}



const infoBoxOptions = { 
  closeBoxURL: '', 
  enableEventPropagation: true 
};

const newCenter = {lat: 25, lng: -90};








 const mapOptions = {
  center: {
    lat: 29.749,
    lng: -95.358
  },
  zoom: 8,
  size: {minWidth: '600px', height: '600px'}
 }
function EventMap() {

  const [facilities, setFacilities] = useState([])
  const [infoBoxPosition, setInfoBoxPosition] = useState(mapOptions.center)
  const [visibility, setVisibility] = useState(false)
  const [map, setMap] = React.useState(null)
  const [infoBox, setInfoBox] = React.useState(null)
  const [input, setInput] = React.useState('')


  const getData = async (url) => {
    const newData = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then(res => res.json());
    console.log(newData);
    setFacilities(newData.recordset)
}

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBg7_yys3sc_lunTZ_5pPaAl5dAk48PHMY"
  })

  const onLoad = React.useCallback(function callback(map) {
    getData('./api2');
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const toggleInfoBox = (event) => {
    setVisibility(false);
  }

  const handleRightClick = (event) => {
    setVisibility(true);
    setInfoBoxPosition(event.latLng);
  }

  const infoBoxLoad = React.useCallback(function callback(infoBox){
    setInfoBox(infoBox);
  }, [])

  return isLoaded ? (
    <div>
      <label style={{padding:'0px 10px'}}>Enter a decision unit key:</label>
      <input onChange={(event) => setInput(event.target.value)} type="text" value={input}/>
      <button type="button" onClick={() => {if (input != '') getData('./api2?dec_unit_key='+input)}} >Search Facilities</button>
    <GoogleMap
      mapContainerStyle={mapOptions.size}
      center={mapOptions.center}
      zoom={mapOptions.zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onRightClick={handleRightClick}
      onClick={toggleInfoBox}
      onDrag={toggleInfoBox}
      clickableIcons={false}
    >
      <InfoBox
      onLoad = {infoBoxLoad}
      options={infoBoxOptions}
      position={infoBoxPosition}
      visible={visibility}
    >
      <div>
        <button type="button">Create Node</button>
      </div>
    </InfoBox>

    {facilities.map(facility =>
      <InfoBox 
        options={infoBoxOptions} 
        position={{lat: facility.LATITUDE, lng: facility.LONGITUDE}}
      >
        <div style={{backgroundColor:'white'}}>Facility</div>
      </InfoBox>
    )}

    </GoogleMap></div>
  ) : <></>
}

 export default EventMap