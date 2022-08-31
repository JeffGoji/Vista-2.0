import React, { useState } from "react";
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
  const mapOptions = {
    center: {
      lat: 40.862540,
      lng: -79.894790
    },
    zoom: 8,
    size: { minWidth: '600px', height: '600px' }
  }
  const [facilities, setFacilities] = useState([])
  const [infoBoxPosition, setInfoBoxPosition] = useState(mapOptions.center)
  const [visibility, setVisibility] = useState(false)
  const [map, setMap] = React.useState(null)
  const [infoBox, setInfoBox] = React.useState(null)
  const [input, setInput] = React.useState('1707')
  const [bounds, setBounds] = React.useState({ north: 0, south: 0, east: 0, west: 0 })
  const infoBoxOptions = {
    closeBoxURL: '',
    enableEventPropagation: true
  };
  const [selectedFacilities, setSelectedFacilities] = useState([])


  // finds the bounds of the selected facilities so that when the user selects a new decision unit key
  // the map will automatically center on those facilities
  const findBounds = () => {
    // get list of latitudes and longitudes
    const latitudes = facilities.map(facility => facility.LATITUDE)
    const longitudes = facilities.map(facility => facility.LONGITUDE)

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
    const bounds = {
      north: largestLat,
      south: smallestLat,
      east: largestLng,
      west: smallestLng
    }
    return bounds;
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBg7_yys3sc_lunTZ_5pPaAl5dAk48PHMY",
  })

  const onLoad = React.useCallback(function callback(map) {
    console.log("map is loading")
    map.fitBounds(findBounds())
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

  const infoBoxLoad = React.useCallback(function callback(infoBox) {
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

  const displayFacilities = () => {
    if (facilities !== []) {
      if (input !== '') {
        const filteredFacilities = facilities.filter(facility => (facility.DEC_UNIT_KEY === parseInt(input)))
        return filteredFacilities.map(facility => (
          <InfoBox
            options={infoBoxOptions}
            position={{ lat: facility.LATITUDE, lng: facility.LONGITUDE }}
          >
            <div style={{ backgroundColor: 'white', fontSize: "1.2rem" }}>Facility</div>
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
    setBounds(findBounds())
    map.fitBounds(bounds)
    console.log(bounds)
  }

  React.useEffect(() => {
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
    getData('./api2').catch(console.error)
  }, [])

  console.log("return")
  console.log(facilities)
  return isLoaded ? (
    <div>
      <label style={{ padding: '0px 10px' }}>Select a decision unit key:</label>
      <select onChange={handleSelectChange}>
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
          onLoad={infoBoxLoad}
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