import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Nav from './Components/Nav';
import Main from './Components/Main';
import Nominations from './Components/Nominations';
import MeterBurnList from './Components/MeterBurnList';


function App() {

  // state variables
  const [BU, setBU] = useState({buName: '', pipelineID: ''}) // business unit state
  const [BA, setBA] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-bg">
      <Nav BU={BU} setBU={setBU} BA={BA} setBA={setBA} /> {/* pass the business unit state to other components */}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/nominations' element={<Nominations />} />
        <Route path='/meter-burn-list' element={<MeterBurnList BU={BU} />} />
      </Routes>
    </div>
  );
}

export default App;
