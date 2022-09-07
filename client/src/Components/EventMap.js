import React, { useState, useEffect, useRef } from "react";
import "@szhsin/react-menu/dist/index.css";
import { useJsApiLoader, InfoBox, GoogleMap } from "@react-google-maps/api";
import facilityLogo from "../assets/img/gas-plant-icon.png"

// displays the map
function EventMap() {
  // declare some constants
  const [facilities, setFacilities] = useState([])
  const [displayFacilities, setDisplayFacilities] = useState([])
  const [infoBoxPosition, setInfoBoxPosition] = useState()
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
    return bounds
  }

  // loads the google maps api
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBg7_yys3sc_lunTZ_5pPaAl5dAk48PHMY",
  })

  // this function is called when the map loads
  const onLoad = React.useCallback(function callback(map) {
    map.setCenter({ lat: 38.34, lng: -98.20 })
    map.setZoom(10)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  // this function toggles the visibility of the menu that pops up when
  // the user right clicks
  const toggleInfoBox = (event) => {
    setVisibility(false);
  }

  // when the user right clicks, the menu becomes visible
  const handleRightClick = (event) => {
    setVisibility(true);
    setInfoBoxPosition(event.latLng);
  }

  const infoBoxLoad = React.useCallback(function callback(infoBox) {
    setInfoBox(infoBox);
  }, [])

  // this function fills the options of the select tag with decision unit keys
  const fillValues = (input) => {
    if (facilities !== []) {
      //create an array of the decision unit keys
      const dec_unit_keys = facilities.map(facility => facility.DEC_UNIT_KEY)
      // filter out the unique values and sort them
      const filteredKeys = dec_unit_keys.filter((dec_unit_key, index) => (dec_unit_keys.indexOf(dec_unit_key) === index)).sort()
      // map each value to an option
      return filteredKeys.map(filteredKey => <option key={filteredKey} value={filteredKey}>{filteredKey}</option>)
    }
  }

  // this function filters the facilities based on the decision unit provided
  const filterFacilities = () => {
    const filteredFacilities = facilities.filter(facility => (facility.DEC_UNIT_KEY === parseInt(input)))
    return filteredFacilities
  }

  // this function is to be called in the return statement, it places
  // the selected facilities on the map
  const showFacilities = () => {
    if (displayFacilities !== []) {
      if (input !== '') {
        return displayFacilities.map(facility => (

          <InfoBox
            key={facility.FAC_KEY}
            options={infoBoxOptions}
            position={{ lat: facility.LATITUDE, lng: facility.LONGITUDE }}
          >
            <div>
              <img src={facilityLogo} alt="Facility" width="75" height="75" />
              <p>{facility.FAC_NAME}</p>
            </div>
          </InfoBox>))
      }
    }
  }

  // when a user changes the decision unit in the select dropbox this
  // function is called
  const handleSelectChange = (event) => {
    setInput(event.target.value)
  }

  // this function is used to make the api call and to call certain functions once
  // the variable states have updated
  useEffect(() => {
    // make the api call, i only want to get the data on the first render
    if (renders.current < 2) {
      // api call
      const getData = async (url) => {
        await fetch(url, {
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
      // increment renders to make sure the api call is only made on the first render
      renders.current += 1
      return;
    }

    // this block of code will execute when input state is updated. it filters the new
    // facilities, finds the new bounds, updates the map, then sets the displayFacilities
    // state variable
    let selectedFacilities = filterFacilities()
    let bounds = findBounds(selectedFacilities)
    if (map != null)
      map.fitBounds(bounds)
    setDisplayFacilities(selectedFacilities)
  }, [input, facilities])

  return isLoaded ? (
    <div>
      <label style={{ padding: '0px 10px' }}>Select a decision unit key:</label>
      <select id="chooseDecisionUnit" onChange={handleSelectChange}>
        {fillValues()}
      </select>
      <GoogleMap
        mapContainerStyle={{ height: "600px", width: "800px" }}
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
        {showFacilities()}
      </GoogleMap></div>

  ) : <></>
}

export default EventMap