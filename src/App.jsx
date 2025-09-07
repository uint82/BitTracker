import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div
      className="min-h-screen bg-gray-800"
      style={{
        color: "white",
      }}
    >
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
