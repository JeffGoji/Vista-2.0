import React,{ useState, useEffect, useRef } from "react";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useJsApiLoader, InfoBox, GoogleMap, Circle, Rectangle } from "@react-google-maps/api";

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
  const exampleBounds = {
    north: 41.02207,
    south: 40.301487,
    east: -78.438065,
    west: -79.54162
  }
  const mapOptions = {
    center: {
      lat: 40.862540,
      lng: -79.894790
    },
    zoom: 8,
    size: {minWidth: '600px', height: '600px'}
  }
  const [facilities, setFacilities] = useState([])
  const [displayFacilities, setDisplayFacilities] = useState([])
  const [infoBoxPosition, setInfoBoxPosition] = useState(mapOptions.center)
  const [visibility, setVisibility] = useState(false)
  const [map, setMap] = React.useState(null)
  const [infoBox, setInfoBox] = React.useState(null)
  const [input, setInput] = React.useState('1707')
  const infoBoxOptions = { 
    closeBoxURL: '', 
    enableEventPropagation: true 
  };
  const renders = useRef(0)
  

  // finds the bounds of the selected facilities so that when the user selects a new decision unit key
  // the map will automatically center on those facilities
  const findBounds = (selectedFacilities) => {
    // get list of latitudes and longitudes
    const latitudes = selectedFacilities.map(facility => facility.LATITUDE)
    const longitudes = selectedFacilities.map(facility => facility.LONGITUDE)

    // find lowest and highest latitude and longitude values
    let largestLat = -181;
    let largestLng = -181;
    let smallestLat = 181;
    let smallestLng = 181;
    latitudes.forEach((lat) => {
      if (lat > largestLat)
        largestLat = lat
      if (lat < smallestLat)
        smallestLat = lat
    })
    longitudes.forEach((lng) => {
      if (lng > largestLng)
        largestLng = lng
      if (lng < smallestLng)
        smallestLng = lng
    })

    // create a bounds based off of the highest and lowest values
    let bounds = {
      north: smallestLat,
      south: largestLat,
      east: largestLng,
      west: smallestLng
    }
    const averageLatitude = (largestLat + smallestLat) / 2
    const averageLongtitude = (largestLng + smallestLng) / 2

    let center = {lat:averageLatitude, lng:averageLongtitude}
    return bounds
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBg7_yys3sc_lunTZ_5pPaAl5dAk48PHMY",
  })

  const onLoad = React.useCallback(function callback(map) {
    map.fitBounds(exampleBounds)
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
    if (facilities !== []) {
      //create an array of the decision unit keys
      const dec_unit_keys = facilities.map(facility => facility.DEC_UNIT_KEY)
      // filter out the unique values and sort them
      const filteredKeys = dec_unit_keys.filter((dec_unit_key, index) => (dec_unit_keys.indexOf(dec_unit_key) === index)).sort()
      // map each value to an option
      return filteredKeys.map(filteredKey => <option value={filteredKey}>{filteredKey}</option>)
    }
  }

  const filterFacilities = () =>{
    const filteredFacilities = facilities.filter(facility => (facility.DEC_UNIT_KEY === parseInt(input)))
    return filteredFacilities
  }

  const showFacilities = () => {
    if (displayFacilities !== []) {
      if (input !== ''){
        return displayFacilities.map(facility => (
          <InfoBox
            options={infoBoxOptions} 
            position={{lat: facility.LATITUDE, lng: facility.LONGITUDE}}
          >
            <div style={{backgroundColor:'white', fontSize: "1.2rem"}}>Facility</div>
          </InfoBox>))
      }
      return (<InfoBox 
        options={infoBoxOptions} 
        position={mapOptions.center}
      >
        <div></div>
      </InfoBox>)
    }
  }

  const handleSelectChange = (event) => {
    setInput(event.target.value)
  }

  useEffect(() => {
    // the program renders twice at the start, i only want to get the data on the first render
    if (renders.current < 2) {
      const getData = async (url) => {
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => setFacilities(res.recordset))
      }
      getData('./facilities').catch(console.error)
      renders.current += 1
      return;
    }

    // this block of code will execute when input is changed, filter the new facilities,
    // find the new bounds, and then update the map
    let selectedFacilities = filterFacilities()
    let bounds = findBounds(selectedFacilities)
    if (map != null)
      map.fitBounds(bounds)
    setDisplayFacilities(selectedFacilities)
  }, [input, facilities])
  
  return isLoaded ? (
    <div>
      <label style={{padding:'0px 10px'}}>Select a decision unit key:</label>
      <select id="chooseDecisionUnit" onChange={handleSelectChange}>
        {fillValues()}
      </select>
    <GoogleMap
      mapContainerStyle={mapOptions.size}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onRightClick={handleRightClick}
      onClick={toggleInfoBox}
      onDrag={toggleInfoBox}
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
    {showFacilities()}
    </GoogleMap></div>
  ) : <></>
}

 export default EventMap