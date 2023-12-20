import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import AboutUs from "./Components/AboutUs";
import About from "./Components/About";
import FAQs from "./Components/FAQs";
import Footer from "./Components/Footer";
import PlayerNavbar from "./Components/PlayerNavbar";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import Owner from "./Components/Owner";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes (no authentication required) */}
        <Route
          path="/"
          element={
            <div className="App">
              <Navbar />
              <Hero />
              <AboutUs />
              <About />
              <FAQs />
              <Footer />
            </div>
          }
        />

        {/* User authentication routes */}
        <Route
          path="/login"
          element={
            <div className="UserAuth">
              <LoginPage />
            </div>
          }
        />

        {/* User registration routes */}
        <Route
          path="/register"
          element={
            <div className="UserReg">
              <RegisterPage />
            </div>
          }
        />

        <Route
          path="/profile/:userType/:username"
          element={
            <div className="ownerProfile">
              <Owner />
            </div>
          }
        />

        {/* Authenticated user routes */}
        <Route
          path="/user"
          element={<PlayerNavbar />}
          // Add nested routes for authenticated user pages as needed
        />
      </Routes>
    </Router>
  );
}

export default App;
