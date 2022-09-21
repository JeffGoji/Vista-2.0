import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Nav from './Components/Nav';
import Main from './Components/Main';
import Nominations from './Components/Nominations';
import MeterBurnList from './Components/MeterBurnList';
import NetworkGraph from './Components/NetworkGraph';

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

// api call functions
const getData = async (url) => {
  const data = await fetch(url, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
      },
  })
  .then(res => res.json())
  return data
}

function App() {

  // variables and constants
  const BUs = [ // array of Business Units
    {
        buName: 'Peoples Natural Gas Company LLC',
        pipelineID: '00000001'
    },
    {
        buName: 'Peoples Gas Company (PTWP)',
        pipelineID: '00004136'
    },
    {
        buName: 'Peoples Gas Company West Virginia',
        pipelineID: '00004287'
    },
    {
        buName: 'Delgasco, LLC',
        pipelineID: '00009177'
    },
    {
        buName: 'Enpro, LLC',
        pipelineID: '00009454'
    }
  ]

  // state variables and constants
  const [BU, setBU] = useState({buName: '', pipelineID: ''}) // selected business unit
  const [BA, setBA] = useState({}) // selected business associate
  const [BAs, setBAs] = useState([]) // array of business associates
  const [contract, setContract] = useState({}) // selected contract
  const [contracts, setContracts] = useState([]) // array of contracts
  const [cntrPathRates, setCntrPathRates] = useState([])
  const [points, setPoints] = useState([])

  //references
  const renders = useRef(0) // used to track number of renders
  const prevBAs = usePrevious(BAs)
  const prevContracts = usePrevious(contracts)
  const prevContract = usePrevious(contract)

  // useEffect is called after rendering
  useEffect(() => {
    if (renders.current < 1) { // run this code only if it is the first render

      // api calls
      console.log('getting data...')
      getData('./bas').catch(console.error).then(res => setBAs(res.recordset))
      getData('./contracts').catch(console.error).then(res => setContracts(res.recordset))
      getData('./cntrPathRates').catch(console.error).then(res => setCntrPathRates(res.recordset))
      getData('./points').catch(console.error).then(res => setPoints(res.recordset))
      // end of api calls
      
      window.scrollTo(0, 0);

      renders.current = renders.current + 1
    }

    if (BAs !== prevBAs && BAs.length !== 0) {
      console.log("business associates: ")
      console.log(BAs)
    }
    if (contracts !== prevContracts && contracts.length !== 0) {
      console.log("contracts: ")
      console.log(contracts)
    }

  }, [BAs, contracts]);

  return (
    <div className="main-bg">
      <Nav
        BUs={BUs}
        BAs={BAs}
        prevBAs={prevBAs}
        setBU={setBU}
        setBA={setBA}
        BU={BU}
      />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/nominations'
          element={
            <Nominations
              contracts={contracts}
              setContract={setContract}
            />
          }
        />
        <Route
          path='/meter-burn-list'
          element={
            <MeterBurnList
              usePrevious={usePrevious}
              contract={contract}
              setContract={setContract}
              contracts={contracts}
              points={points}
              BA={BA}
              cntrPathRates={cntrPathRates}
              prevContract={prevContracts}
            />
          }
        />
        <Route
          path='/network-builder'
          element={<NetworkGraph />}
        />
      </Routes>
    </div>
  );
}

export default App;
