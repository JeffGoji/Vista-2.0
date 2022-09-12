import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Nav from './Components/Nav';
import Main from './Components/Main';
import Nominations from './Components/Nominations';
import MeterBurnList from './Components/MeterBurnList';


function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-bg">
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/nominations' element={<Nominations />} />
        <Route path='/meter-burn-list' element={<MeterBurnList />} />
      </Routes>
    </div>
  );
}

export default App;
