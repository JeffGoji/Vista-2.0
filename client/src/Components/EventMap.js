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


function EventMap() {
  const mapOptions = {
    center: {
      lat: 40.862540,
      lng: -79.894790
    },
    zoom: 8,
    size: {minWidth: '600px', height: '600px'}
  }
  const [facilities, setFacilities] = useState([])
  const [selectedFacilities, setSelectedFacilities] = useState([])
  const [infoBoxPosition, setInfoBoxPosition] = useState(mapOptions.center)
  const [visibility, setVisibility] = useState(false)
  const [map, setMap] = React.useState(null)
  const [infoBox, setInfoBox] = React.useState(null)
  const [input, setInput] = React.useState('1707')
  const infoBoxOptions = { 
    closeBoxURL: '', 
    enableEventPropagation: true 
  };

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
    googleMapsApiKey: "AIzaSyBg7_yys3sc_lunTZ_5pPaAl5dAk48PHMY",
  })

  const onLoad = React.useCallback(function callback(map) {
    getData('./api2')
    map.setCenter(mapOptions.center)
    map.setZoom(mapOptions.zoom)
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

  const fillValues = (input) => {
    //create an array of the decision unit keys
    const dec_unit_keys = facilities.map(facility => facility.DEC_UNIT_KEY)
    // filter out the unique values and sort them
    const filteredKeys = dec_unit_keys.filter((dec_unit_key, index) => (dec_unit_keys.indexOf(dec_unit_key) === index)).sort()
    // map each value to an option
    return filteredKeys.map(filteredKey => <option value={filteredKey}>{filteredKey}</option>)
  }

  const displayFacilities = () => {
    if (input !== ''){
      const filteredFacilities = facilities.filter(facility => (facility.DEC_UNIT_KEY === parseInt(input)))
      return filteredFacilities.map(facility => (
        <InfoBox 
          options={infoBoxOptions} 
          position={{lat: facility.LATITUDE, lng: facility.LONGITUDE}}
        >
          <div style={{backgroundColor:'white'}}>Facility</div>
        </InfoBox>))
    }
    return (<InfoBox 
      options={infoBoxOptions} 
      position={mapOptions.center}
    >
      <div></div>
    </InfoBox>)
  }

  return isLoaded ? (
    <div>
      <label style={{padding:'0px 10px'}}>Select a decision unit key:</label>
      {/*<input onChange={(event) => setInput(event.target.value)} type="text" value={input}/>*/}
      <select onChange={(event) => setInput(event.target.value)}>
        {fillValues()}
      </select>
    <GoogleMap
      mapContainerStyle={mapOptions.size}
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
    {displayFacilities()}
    </GoogleMap></div>
  ) : <></>
}

 export default EventMap