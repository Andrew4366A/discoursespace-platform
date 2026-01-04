// src/components/FeaturesSection.jsx
import React from "react";
import "./FeaturesSection.css";

const features = [
  {
    icon: "💬",
    title: "Blog Posts & Discussions",
    desc: "Share long-form articles or start quick discussions. Perfect for both in-depth analysis and casual conversations.",
    color: "#d946ef",
  },
  {
    icon: "📈",
    title: "Credibility Score",
    desc: "Build your reputation through quality content and community engagement. Your credibility grows with every upvote.",
    color: "#3b82f6",
  },
  {
    icon: "🛡️",
    title: "AI Toxicity Detection",
    desc: "Powered by advanced AI, our platform filters hate speech, spam, and harmful content to keep discussions healthy.",
    color: "#ef4444",
  },
  {
    icon: "👥",
    title: "Topic Communities",
    desc: "Organized communities for every interest. From technology to art, find your tribe and engage with like-minded people.",
    color: "#22c55e",
  },
  {
    icon: "🟧",
    title: "Live Q&A",
    desc: "Real-time collaboration with authors. Ask questions, get instant responses, and dive deep into topics that matter.",
    color: "#f97316",
  },
  {
    icon: "👁️‍🗨️",
    title: "Focus Mode",
    desc: "Distraction-free reading experience. Immerse yourself in quality content without interruptions.",
    color: "#8b5cf6",
  },
];

const FeaturesSection = () => {
  return (
    <div className="features-container">
      <h2 className="features-title">Why DiscourseSpace?</h2>
      <p className="features-sub">
        A next-generation platform designed for meaningful conversations and
        quality content.
      </p>

      <div className="features-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon" style={{ backgroundColor: f.color }}>
              {f.icon}
            </div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
