import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Nav from './Components/Nav';
import Main from './Components/Main';
import Nominations from './Components/Nominations';
import MeterBurnList from './Components/MeterBurnList';

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

function App() {

  // state variables
  const [BU, setBU] = useState({buName: '', pipelineID: ''}) // business unit state
  const [BA, setBA] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-bg">
      <Nav BU={BU} setBU={setBU} setBA={setBA} usePrevious={usePrevious} /> {/* pass the business unit state to other components */}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/nominations' element={<Nominations />} />
        <Route path='/meter-burn-list' element={<MeterBurnList BU={BU} BA={BA} />} />
      </Routes>
    </div>
  );
}

export default App;
