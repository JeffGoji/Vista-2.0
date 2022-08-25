import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Nav from './Components/Nav'
import Main from './Components/Main'


function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
