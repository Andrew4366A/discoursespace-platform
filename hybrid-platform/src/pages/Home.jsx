// src/pages/Home.jsx
import React from "react";
import "./Home.css";
import FeaturesSection from "../components/FeaturesSection";
import About from "./About";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackgroundBalls from "./BackgroundBalls";



const Home = () => {
  const navigate = useNavigate();
  console.log("navigate:", navigate);

  
  return (
    <div>
      <Navbar />
      <>
        <BackgroundBalls />

        <div style={{ height: "5vh", color: "white" }}>
          
        </div>
      </>
      <div className="hero-container">
        <div className="hero-pill">
          <span>⚡ AI-Powered Community Platform</span>
        </div>
        <h1>
          Where Ideas Meet <span className="gradient-text">Community</span>
        </h1>

        <p className="hero-subtext">
          A hybrid platform combining long-form blogging with interactive
          discussions. Build credibility, share knowledge, and grow together.
        </p>

        <div className="hero-actions">
          <div className="hero-buttons">
            <button
              className="start-btn"
              onClick={() => navigate("/dashboard")}
            >
              Start Writing
            </button>
            <button className="learn-btn">Learn More</button>
          </div>

          <ul className="hero-features">
            <li>🛡️ AI-Moderated</li>
            <li>📈 Credibility System</li>
            <li>👥 Topic Communities</li>
          </ul>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />

        <FeaturesSection />
        <About />
        <h1 className="p-3">Ready to Join?</h1>
        <p className="p-3">
          Start sharing your ideas and connect with a community that values
          quality content.
        </p>
        <button className="start-btn mb-5">Start Writing</button>
        <Footer />
      </div>
    </div>
  );
};


export default Home;
