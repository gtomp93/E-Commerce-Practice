import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
