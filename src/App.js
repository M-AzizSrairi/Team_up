import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import AboutUs from "./Components/AboutUs";
import About from "./Components/About";
import FAQs from "./Components/FAQs";
import Footer from "./Components/Footer";
import AuthForm from "./Components/AuthForm";
import PlayerNavbar from "./Components/PlayerNavbar"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="App">
          <Navbar />
          <Hero />
          <AboutUs />
          <About />
          <FAQs />
          <Footer />
        </div>} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/user" element={<PlayerNavbar/>} />
      </Routes>
    </Router>
  );
}

export default App;
