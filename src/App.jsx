import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Visualisasi from "./components/Visualisasi";
import Tutorial from "./components/Tutorial";
import Footer from "./components/Footer";
import Kalkulasi from "./components/Kalkulasi";

function App() {
  return (
    <Router basename={import.meta.env.PROD ? "/opensinta" : ""}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualisasi" element={<Visualisasi />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/kalkulasi" element={<Kalkulasi />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
