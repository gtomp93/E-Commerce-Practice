import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import ItemDetails from "./ItemDetails";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path={`/item/:id`} element={<ItemDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
