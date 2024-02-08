import React from 'react';
import Home from './components/Home';
import SakilaNav from "./components/Navbar";
import SearchFilm from './components/Searchfilm'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    
    <div className="sticky" style={{height: '200%'}}>
      
      <BrowserRouter><SakilaNav/></BrowserRouter>
      <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Searchfilm" element={<SearchFilm />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
