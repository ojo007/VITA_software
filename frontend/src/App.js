import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LPOApplication from './Components/LPO_Application/LPOApplication';
import AddLPO from './Components/LPO_Application/AddLPO';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LPOApplication />} />
        <Route path='/Homepage/AddLPO' element={<AddLPO />} />
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
