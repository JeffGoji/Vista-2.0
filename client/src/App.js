import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Nav from './Components/Nav';
import Main from './Components/Main';
import Ebb1 from './Components/Ebb1';
import Ebb2 from './Components/Ebb2';


function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-bg">
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/ebb1' element={<Ebb1 />} />
        <Route path='/ebb2' element={<Ebb2 />} />
      </Routes>
    </div>
  );
}

export default App;
