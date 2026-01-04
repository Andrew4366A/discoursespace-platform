import React from 'react'
import "./Home.css";

function About() {
  return (
    <div className="p-5 about-container d-flex flex-column justify-center">
      <h1 className="p-2">About DiscourseSpace</h1>
      <p className="about-text p-3">
        DiscourseSpace is a hybrid community forum and blogging platform
        designed to foster meaningful conversations and high-quality content
        creation. We combine the best of both worlds: the depth of long-form
        blogging with the interactivity of community discussions.
        <br />
        <br /> Our platform uses advanced AI technology to maintain a healthy,
        respectful community environment. Every piece of content is
        automatically screened for toxicity, ensuring that discussions remain
        constructive and welcoming.
        <br />
        <br /> Built on a credibility-based system, DiscourseSpace rewards
        quality contributions and expert knowledge. As you engage with the
        community, share insights, and create valuable content, your credibility
        score grows, establishing you as a trusted voice in your areas of
        expertise.
        <br />
        <br /> Whether you're a seasoned blogger, a casual reader, or someone
        looking to start meaningful conversations, DiscourseSpace provides the
        tools and community to help you thrive.
      </p>
    </div>
  );
}

export default About