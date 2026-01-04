import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaEdit, FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import "./AdminPanel.css";

function AdminPanel() {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();
  const { blogs, discussions, deleteBlog, deleteDiscussion, addNotification } = usePosts();
  const [activeTab, setActiveTab] = useState("posts");

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeletePost = (postId, postType) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (postType === "blog") {
        deleteBlog(postId);
        addNotification({
          type: "success",
          message: "Blog post deleted successfully",
        });
      } else {
        deleteDiscussion(postId);
        addNotification({
          type: "success",
          message: "Discussion deleted successfully",
        });
      }
    }
  };

  const allPosts = [...blogs.map(b => ({ ...b, type: "blog" })), ...discussions.map(d => ({ ...d, type: "discussion" }))];

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          <FaEdit /> Posts Management
        </button>
        <button
          className={activeTab === "stats" ? "active" : ""}
          onClick={() => setActiveTab("stats")}
        >
          <FaChartBar /> Statistics
        </button>
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          <FaUsers /> Users
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "posts" && (
          <div className="posts-management">
            <h2>All Posts ({allPosts.length})</h2>
            <div className="posts-list">
              {allPosts.length === 0 ? (
                <p>No posts found.</p>
              ) : (
                allPosts.map((post) => (
                  <div key={`${post.type}-${post.id}`} className="admin-post-card">
                    <div className="post-header-info">
                      <span className="post-type-badge">{post.type === "blog" ? "Blog" : "Discussion"}</span>
                      <h3>{post.title}</h3>
                    </div>
                    <p className="post-excerpt">{post.content?.slice(0, 150)}...</p>
                    <div className="post-meta-info">
                      <span>👤 {post.author}</span>
                      <span>📅 {post.date}</span>
                      <span>🏷️ {post.category}</span>
                      <span>👍 {post.likes || 0}</span>
                      <span>👁️ {post.views || 0}</span>
                    </div>
                    <div className="post-actions-admin">
                      <button
                        className="delete-btn-admin"
                        onClick={() => handleDeletePost(post.id, post.type)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="admin-stats">
            <h2>Platform Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{blogs.length}</h3>
                <p>Blog Posts</p>
              </div>
              <div className="stat-card">
                <h3>{discussions.length}</h3>
                <p>Discussions</p>
              </div>
              <div className="stat-card">
                <h3>{allPosts.length}</h3>
                <p>Total Posts</p>
              </div>
              <div className="stat-card">
                <h3>{allPosts.reduce((sum, p) => sum + (p.likes || 0), 0)}</h3>
                <p>Total Likes</p>
              </div>
              <div className="stat-card">
                <h3>{allPosts.reduce((sum, p) => sum + (p.views || 0), 0)}</h3>
                <p>Total Views</p>
              </div>
              <div className="stat-card">
                <h3>{allPosts.reduce((sum, p) => sum + (p.comments?.length || 0), 0)}</h3>
                <p>Total Comments</p>
              </div>
            </div>

            <div className="category-stats">
              <h3>Posts by Category</h3>
              <div className="category-list">
                {["Technology", "Science", "Art & Design", "Education", "Business", "Gaming", "Lifestyle", "Other"].map((cat) => {
                  const count = allPosts.filter(p => p.category === cat).length;
                  return (
                    <div key={cat} className="category-item">
                      <span className="category-name">{cat}</span>
                      <span className="category-count">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="users-management">
            <h2>Users Management</h2>
            <p className="coming-soon">User management features coming soon...</p>
            <div className="users-list">
              {/* This would be populated from a users API/context */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;



