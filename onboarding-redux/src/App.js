import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home />}/>
      </Routes>
    </div>
  );
}

export default App;
