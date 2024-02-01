import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowsList from './ShowsList';
import ShowDetails from './ShowDetails';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowsList />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
