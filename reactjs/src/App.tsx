import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Addpage from './Pages/Addpage';
import Editpage from './Pages/Editpage';
import Search from './Pages/Search';
import Select from './Pages/Select';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Addpage />}></Route>
            <Route path="/add" element={<Addpage />}></Route>
            <Route path="/edit" element={<Editpage />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/select" element={<Select />}></Route>
          </Routes>
        </BrowserRouter>
        
      </header>
    </div>
  );
}

export default App;
