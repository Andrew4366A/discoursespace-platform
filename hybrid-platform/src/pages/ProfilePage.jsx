import React, { useMemo, useState } from "react";
import "./ProfilePage.css";
import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("answered");
  const { blogs, discussions, bookmarkedPosts } = usePosts();

  const savedPosts = useMemo(() => {
    return bookmarkedPosts
      .map((bookmark) => {
        const source =
          bookmark.type === "blog" ? blogs : discussions;
        const post = source.find((p) => p.id === bookmark.id);
        return post ? { ...post, type: bookmark.type } : null;
      })
      .filter(Boolean);
  }, [bookmarkedPosts, blogs, discussions]);

  return (
    <div className="profile-wrapper">
      {/* ===== COVER BANNER ===== */}
      <div className="cover-banner">
        <div className="cover-overlay"></div>
      </div>

      {/* ===== PROFILE TOP SECTION ===== */}
      <div className="profile-top">
        <img
          src="https://via.placeholder.com/130"
          alt="User"
          className="profile-avatar"
        />

        <div className="profile-basic">
          <h2 className="profile-name">Andrew</h2>
          <p className="profile-bio">
            A curious mind learning tech, spirituality & world knowledge.
            Building myself into the best version.
          </p>

          <div className="profile-extra">
            <span>📍 Coimbatore, India</span>
            <span>⭐ Credibility: 84</span>
          </div>

          <div className="profile-stats">
            <div className="stat-block">
              <h4>210</h4>
              <p>Followers</p>
            </div>
            <div className="stat-block">
              <h4>180</h4>
              <p>Following</p>
            </div>
            <div className="stat-block">
              <h4>32</h4>
              <p>Communities</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TABS SECTION ===== */}
      <div className="profile-tabs">
        <button
          className={activeTab === "answered" ? "tab active" : "tab"}
          onClick={() => setActiveTab("answered")}
        >
          Answered
        </button>

        <button
          className={activeTab === "asked" ? "tab active" : "tab"}
          onClick={() => setActiveTab("asked")}
        >
          Asked Questions
        </button>

        <button
          className={activeTab === "communities" ? "tab active" : "tab"}
          onClick={() => setActiveTab("communities")}
        >
          Communities
        </button>

        <button
          className={activeTab === "activity" ? "tab active" : "tab"}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>

        <button
          className={activeTab === "saved" ? "tab active" : "tab"}
          onClick={() => setActiveTab("saved")}
        >
          Saved
        </button>
      </div>

      {/* ===== TAB CONTENT ===== */}
      <div className="tab-content">
        {activeTab === "answered" && <p>No answered questions yet.</p>}
        {activeTab === "asked" && <p>You haven't asked anything yet.</p>}
        {activeTab === "communities" && (
          <p>List of your joined/created communities.</p>
        )}
        {activeTab === "activity" && (
          <p>Your overall activity will appear here.</p>
        )}
        {activeTab === "saved" && (
          <div className="saved-list">
            {savedPosts.length === 0 ? (
              <p>No saved posts yet. Tap “Save” on any post to see it here.</p>
            ) : (
              savedPosts.map((post) => (
                <div
                  key={`${post.type}-${post.id}`}
                  className="saved-card"
                >
                  <div className="saved-meta">
                    <span className="saved-badge">
                      {post.type === "blog" ? "Blog" : "Discussion"}
                    </span>
                    <span className="saved-date">{post.date}</span>
                  </div>
                  <Link to={`/post/${post.id}`} className="saved-title">
                    {post.title}
                  </Link>
                  <p className="saved-excerpt">
                    {post.content?.slice(0, 140) || ""}...
                  </p>
                  <div className="saved-tags">
                    {(post.tags || []).map((tag, idx) => (
                      <span key={idx}>#{tag}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
