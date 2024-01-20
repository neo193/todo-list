
import React from 'react';
import Home from './home';
import Login from './utils/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/"  element={<Login/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
