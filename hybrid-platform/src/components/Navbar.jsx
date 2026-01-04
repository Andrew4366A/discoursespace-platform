// import { Link } from "react-router-dom";


// function Navbar() {
  
//   return (
//     <nav style={{ padding: "10px", background: "#222", color: "white" }}>
//       <Link to="/" style={{ marginRight: "20px", color: "white" }}>
//         Home
//       </Link>
//       <Link to="/blogs" style={{ marginRight: "20px", color: "white" }}>
//         Blogs
//       </Link>
//       <Link to="/create-blog" style={{ marginRight: "20px", color: "white" }}>
//         Write
//       </Link>
//       <Link to="/discussions" style={{ marginRight: "20px", color: "white" }}>
//         Discussions
//       </Link>
//       <Link to="/ask-question" style={{ marginRight: "20px", color: "white" }}>
//         Ask
//       </Link>
//       <Link to="/profile" style={{ marginRight: "20px", color: "white" }}>
//         Profile
//       </Link>
//       <Link to="/login" style={{ color: "white" }}>
//         Login
//       </Link>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center p-3">
      <h4 className="fw-bold gradient-text">💬 DiscourseSpace</h4>

      <div className="d-flex align-items-center gap-3">
        <Link to="/" className="text-decoration-none">
          <p className="m-0">Login</p>
        </Link>
        <button
          className="btn start-btn text-white"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Navbar;

