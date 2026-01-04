import React from "react";

function Footer() {
  return (
    <footer
      className="w-100 bg-dark text-light pt-5 pb-3"
      style={{ marginTop: "auto" }}
    >
      <div className="px-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold gradient-text">💬 DiscourseSpace</h4>
            <p className="mt-3 text-secondary">
              A hybrid community forum & blogging platform built for meaningful
              conversations.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Connect With Us</h6>
            <div className="d-flex gap-3 mt-3">
              <span className="fs-4">🌐</span>
              <span className="fs-4">🐦</span>
              <span className="fs-4">📸</span>
              <span className="fs-4">▶️</span>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        <p className="text-center text-secondary mt-3">
          © 2025 DiscourseSpace — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
