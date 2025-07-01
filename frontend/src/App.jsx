import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Adjust the path based on your project structure
import Ring from "./screens/Ring";
import Bracelet from "./screens/Bracelet";
import Necklace from "./screens/Necklace";
import Earring from "./screens/Earring";
import  Blogs from "./screens/Blog";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/rings" element={<Ring />} />
          <Route path="/bracelets" element={<Bracelet />} />
          <Route path="/necklaces" element={<Necklace />} />
          <Route path="/earrings" element={<Earring />} />

          <Route path="/jewellery-sets" element={<div>Jewellery Sets Page</div>} />
          <Route path="/collections" element={<div>Collections Page</div>} />
          <Route path="/new-arrivals" element={<div>New Arrivals Page</div>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;