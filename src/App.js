import React from 'react';
import Home from './components/Home';
import SakilaNav from "./components/Navbar";
import SearchFilm from './components/Searchfilm';
import Customer from './components/Customer';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Route path="/customer" element={<Customer />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
