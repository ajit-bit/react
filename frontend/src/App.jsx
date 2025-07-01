import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Adjust the path based on your project structure
import Ring from "./screens/Ring";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/rings" element={<Ring />} />
          {/* Add other routes as needed */}
          <Route path="/earrings" element={<div>Earrings Page</div>} />
          <Route path="/necklaces" element={<div>Necklaces Page</div>} />
          <Route path="/bracelets" element={<div>Bracelets Page</div>} />
          <Route path="/jewellery-sets" element={<div>Jewellery Sets Page</div>} />
          <Route path="/collections" element={<div>Collections Page</div>} />
          <Route path="/new-arrivals" element={<div>New Arrivals Page</div>} />
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/products" element={<div>Products Page</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;