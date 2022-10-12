import React, { useState, useEffect, useRef } from "react";
import "@szhsin/react-menu/dist/index.css";
import { useJsApiLoader, InfoBox, GoogleMap, Marker, MarkerClusterer, Polyline } from "@react-google-maps/api";
import facilityLogo from "../assets/img/gas-plant-icon.png"
import meterLogo from "../assets/img/gas-meter.webp"

// custom react Hook for storing previous values
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

// displays the map
function EventMap() {



  // declare some constants
  const [facilities, setFacilities] = useState([])
  const [processProcess, setProcessProcess] = useState([])
  const [allocNetwork, setAllocNetwork] = useState([])
  const [allocNetworkName, setAllocNetworkName] = useState()
  const prevAllocNetworkName = usePrevious(allocNetworkName)
  const prevFacilities = usePrevious(facilities)
  const [allocProcesses, setAllocProcesses] = useState([])
  const [facKey, setFacKey] = useState('')
  const prevFacKey = usePrevious(facKey)
  const [measPts, setMeasPnts] = useState([])
  const [displayFacilities, setDisplayFacilities] = useState([])
  const prevDisplayFacilities = usePrevious(displayFacilities)
  const [displayMeasPts, setDisplayMeasPts] = useState([])
  const [infoBoxPosition, setInfoBoxPosition] = useState()
  const [visibility, setVisibility] = useState(false)
  const [map, setMap] = React.useState(null)
  const [infoBox, setInfoBox] = React.useState(null)
  const [decisionUnit, setDecisionUnit] = React.useState('1707')
  const prevDecisionUnit = usePrevious(decisionUnit)
  const [toggleMeters, setToggleMeters] = React.useState(false)
  const infoBoxOptions = {
    closeBoxURL: '',
    enableEventPropagation: true
  };
  const renders = useRef(1) // end of variables
  const [path, setPath] = useState([])
  const [polyline, setPolyline] = useState()

  // define api calls
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
  const getMeasPts = async (url) => {
    await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => setMeasPnts(res.recordset))
  }
  const getProcessProcess = async (url) => {
    await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => setProcessProcess(res.recordset))
  }
  const getAllocNetwork = async (url) => {
    await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => setAllocNetwork(res.recordset))
  }
  const getAllocProcess = async (url) => {
    await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => setAllocProcesses(res.recordset))
  } // end of api calls

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
    googleMapsApiKey: "AIzaSyCKeEY422ZuBTe73vpjaSySdoJGJ8OX_5Y",
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

  // when the user right clicks, the menu becomes visible
  const handleRightClick = (event) => {
    setVisibility(true);
    setInfoBoxPosition(event.latLng);
  }

  const infoBoxLoad = React.useCallback(function callback(infoBox) {
    setInfoBox(infoBox);
  }, [])

  // this function fills the options of the select tag with decision unit keys
  const fillValues = () => {
    if (allocNetwork !== []) {
      const allocNetworkNames = allocNetwork.map(allocNetwork => allocNetwork.ALLOC_NETWORK_NAME)
      // filter out the unique values and sort them
      const filteredNames = allocNetworkNames.filter((allocNetwork, index) => (allocNetworkNames.indexOf(allocNetwork) === index)).sort()
      // map each value to an option
      return filteredNames.map(filteredName => <option key={filteredName} value={filteredName}>{filteredName}</option>)
    }
  }

  const fillAllocProcessValues = () => {
    if (allocProcesses !== []) {
      return allocProcesses.map(allocProcess => <option key={allocProcess.ALLOC_PROC_KEY} value={allocProcess.ALLOC_PROC_KEY}>{allocProcess.ALLOC_PROC_KEY}</option>)
    }
  }

  // this function filters the facilities based on the decision unit provided
  const filterFacilities = () => {
    const filteredFacilities = facilities.filter(facility => (facility.DEC_UNIT_KEY === parseInt(decisionUnit)))
    return filteredFacilities
  }

  const filterMeasPts = (selectedFacilities) => {
    // get the facility keys
    const fac_keys = selectedFacilities.map(facility => facility.FAC_KEY)
    // select the measurement points where the station fac key equals the facility key
    let filteredMeasPts = []
    fac_keys.forEach(fac_key => {
      measPts.forEach(measPt => {
        if (measPt.STATION_FAC_KEY === parseInt(fac_key))
          filteredMeasPts.push(measPt)
      })
    })
    return filteredMeasPts
  }

  // this function is to be called in the return statement, it places
  // the selected facilities on the map
  const showFacilities = () => {
    if (displayFacilities !== []) {
      return displayFacilities.map(facility => (
        <Marker
          key={facility.FAC_KEY}
          position={{ lat: facility.LATITUDE, lng: facility.LONGITUDE }}
          icon={{
            url: facilityLogo,
            scaledSize: new window.google.maps.Size(50, 50),
            labelOrigin: new window.google.maps.Point(25, 45)
          }}
          label={{ color: 'blue', text: facility.FAC_NAME }}
        >
        </Marker>
      ))
    }
  }

  const showMeasPts = () => {
    if (displayMeasPts !== []) {
      console.log(displayMeasPts)
      return displayMeasPts.map(measPt => (
        <InfoBox
          key={measPt.METERNO}
          options={infoBoxOptions}
          position={{ lat: measPt.LATITUDE, lng: measPt.LONGITUDE }}
        >
          <div>
            <img src={meterLogo} alt="Meter" width="10" height="10" />
            {() => {
              if (map.getZoom() < 10)
                return <p style={{ fontSize: "8px" }}>{measPt.METER_NAME}</p>
            }}
          </div>
        </InfoBox>
      ))
    }
  }

  // when a user changes the decision unit in the select dropbox this
  // function is called
  const handleSelectChange = (event) => {
    setAllocNetworkName(event.target.value)
  }

  const findPath = () => {
    console.log("finding path...")
    let newPath = []
    displayFacilities.forEach(
      facility => {
        newPath.push({ lat: facility.LATITUDE, lng: facility.LONGITUDE })
      }
    )
    return newPath
  }

  /*const createPolyline = () => {
    const newPolyline = new window.google.maps.Polyline({
      path:path,
      strokeColor:'#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 1
    })
    newPolyline.setMap(map)
    setPolyline(newPolyline)
  }*/

  // this function is used to make the api call and to call certain functions once
  // the variable states have updated
  useEffect(() => {

    // code to run on first render
    if (renders.current < 2) {
      getAllocNetwork('./allocNetwork').catch(console.error)
      getData('./facilities').catch(console.error)
      getMeasPts('./measPts').catch(console.error)
      // this is to keep track of number of renders
      renders.current += 1
    }

    // only run this code if the facilities has changed
    if (facilities !== prevFacilities) {
      let selectedFacilities = filterFacilities()
      let bounds = findBounds(selectedFacilities)
      if (map != null)
        map.fitBounds(bounds)
      setDisplayFacilities(selectedFacilities)
    }

    // only run this code if fackey has changed
    if (facKey !== prevFacKey && facKey !== "") {
      getAllocProcess('./allocProcesses?facKey=' + facKey).catch(console.error)
    }

    // only run this code if decision unit has changed
    if (decisionUnit !== prevDecisionUnit) {
      let selectedFacilities = filterFacilities()
      let bounds = findBounds(selectedFacilities)
      if (map != null)
        map.fitBounds(bounds)
      setDisplayFacilities(selectedFacilities)
    }

    // only run this code if the allocation network name has changed
    if (allocNetworkName !== prevAllocNetworkName) {
      let chosenAllocNetworkArray = allocNetwork.filter(allocNetwork => (allocNetwork.ALLOC_NETWORK_NAME === allocNetworkName))
      let chosenAllocNetwork = chosenAllocNetworkArray[0]
      setDecisionUnit(chosenAllocNetwork.DEC_UNIT_KEY)
    }

    if (displayFacilities !== prevDisplayFacilities) {
      setPath(findPath(displayFacilities))
    }

  }, [allocNetworkName, facilities, facKey, decisionUnit, displayFacilities])

  return isLoaded ? (
    <div className="container-fluid">
      <div className="row justify-content-center pb-2">
        <div className="col-auto">
          <GoogleMap
            mapContainerStyle={{ height: '600px', width: '600px' }}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onRightClick={handleRightClick}
            onClick={() => setVisibility(false)}
            onDrag={() => setVisibility(false)}
          >

            {/* <Polyline
              options={{
                strokeColor: 'red',
                strokeOpacity: 0.35,
                strokeWeight: 1,
                draggable: true,
                clickable: true,
                editable: true,
                visible: true,

              }}
              path={path}
            /> */}
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
            <MarkerClusterer>
              {(clusterer) =>
                displayFacilities.map(facility => (
                  <Marker
                    clusterer={clusterer}
                    key={facility.FAC_KEY}
                    position={{ lat: facility.LATITUDE, lng: facility.LONGITUDE }}
                    icon={{
                      url: facilityLogo,
                      scaledSize: new window.google.maps.Size(50, 50),
                      labelOrigin: new window.google.maps.Point(25, 45)
                    }}
                    label={{ color: 'blue', text: facility.FAC_NAME }}
                  >
                  </Marker>
                ))
              }
            </MarkerClusterer>

          </GoogleMap>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <label className="pe-2">Select an allocation network:</label>
          <select id="chooseDecisionUnit" onChange={handleSelectChange}>
            {fillValues()}
          </select>
        </div>
      </div>
    </div>
  ) : <></>
}

export default EventMap