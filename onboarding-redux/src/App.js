import React from 'react';
import Home from './pages/Home';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddUser from './pages/AddUser';


function App() {
  return (
    <div className="App">
         <Home />
         <AddUser />
    </div>
  );
}

export default App;
