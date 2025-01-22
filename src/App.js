import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Main Page */}
          <Route path="/" element={<MainPage />} />

          {/* Add more routes as needed */}
          {/* Example: <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
