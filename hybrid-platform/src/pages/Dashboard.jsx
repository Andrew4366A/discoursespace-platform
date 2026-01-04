import React, { useState, useMemo } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { usePosts } from "../context/PostContext";
import {
  FaCode,
  FaLightbulb,
  FaPalette,
  FaBook,
  FaBriefcase,
  FaGamepad,
  FaHeart,
  FaEllipsisH,
  FaThumbsUp,
  FaBookmark,
  FaTrash,
} from "react-icons/fa";
import { BiChat, BiSearch } from "react-icons/bi";
import Notifications from "../components/Notifications";

function Dashboard() {
  const navigate = useNavigate();
  const { blogs, discussions, toggleLike, toggleBookmark, deleteBlog, deleteDiscussion, addNotification } = usePosts();
  const currentUser = "andrew4366"; // Get from auth context later

  const handleDeletePost = (postId, postType) => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
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
  const [activeTab, setActiveTab] = useState("blogs");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date, likes, views
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.newBlog) {
      // New blog is already added via context
    }
  }, [location.state]);

  const categories = [
    "All Topics",
    "Technology",
    "Science",
    "Art & Design",
    "Education",
    "Business",
    "Gaming",
    "Lifestyle",
    "Other",
  ];

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    const posts = activeTab === "blogs" ? blogs : discussions;
    
    let filtered = posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Topics" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags || []).some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });

    // Sort posts
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "likes") {
        return b.likes - a.likes;
      } else if (sortBy === "views") {
        return b.views - a.views;
      } else {
        // Sort by date (newest first)
        return new Date(b.date) - new Date(a.date);
      }
    });

    return filtered;
  }, [blogs, discussions, activeTab, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="dash-container">
      <nav className="dash-navbar">
        <h2 className="logo gradient-text">DiscourseSpace</h2>
        <div className="nav-right">
          <button
            onClick={() => navigate("/create")}
            className="start-btn btn btn-dark btn-outline-light"
          >
            Create
          </button>
          <Notifications />
          <span className="cred-score">0</span>
          <Link to="/profile">
            <span className="user-name">andrew4366</span>
          </Link>
        </div>
      </nav>

      <div className="dash-content">
        {/* ----- SIDEBAR ----- */}
        <aside className="sidebar">
          <h3 className="side-title">
            <BiChat size={22} /> Categories
          </h3>

          <div
            className={`side-item ${selectedCategory === "All Topics" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All Topics")}
          >
            <BiChat /> All Topics
          </div>
          <div
            className={`side-item ${selectedCategory === "Technology" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Technology")}
          >
            <FaCode /> Technology
          </div>
          <div
            className={`side-item ${selectedCategory === "Science" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Science")}
          >
            <FaLightbulb /> Science
          </div>
          <div
            className={`side-item ${selectedCategory === "Art & Design" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Art & Design")}
          >
            <FaPalette /> Art & Design
          </div>
          <div
            className={`side-item ${selectedCategory === "Education" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Education")}
          >
            <FaBook /> Education
          </div>
          <div
            className={`side-item ${selectedCategory === "Business" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Business")}
          >
            <FaBriefcase /> Business
          </div>
          <div
            className={`side-item ${selectedCategory === "Gaming" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Gaming")}
          >
            <FaGamepad /> Gaming
          </div>
          <div
            className={`side-item ${selectedCategory === "Lifestyle" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Lifestyle")}
          >
            <FaHeart /> Lifestyle
          </div>
          <div
            className={`side-item ${selectedCategory === "Other" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Other")}
          >
            <FaEllipsisH /> Other
          </div>
          {/* --- Communities Section --- */}
          <section className="communities-section mt-5">
            <h2 className="text-center fw-bold mb-4">Top Communities</h2>

            <div className="container d-flex flex-column gap-4">
              <div className="community-card p-4 rounded shadow-sm w-100">
                <h4>💻 Web Development</h4>
                <p className="text-muted">
                  Discuss React, JavaScript, and modern web tech.
                </p>
              </div>

              <div className="community-card p-4 rounded shadow-sm w-100">
                <h4>🤖 AI & Machine Learning</h4>
                <p className="text-muted">
                  Share models, tips, and ML research ideas.
                </p>
              </div>

              <div className="community-card p-4 rounded shadow-sm w-100">
                <h4>📚 Productivity</h4>
                <p className="text-muted">
                  Improve habits, workflows, and lifestyle.
                </p>
              </div>
            </div>
          </section>
        </aside>
        {/* --- Communities Section --- */}

        {/* ----- MAIN FEED ----- */}
        <main className="feed">
          {/* Search */}
          <div className="search-box">
            <BiSearch size={20} />
            <input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Options */}
          <div className="sort-options">
            <label>Sort by: </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Newest First</option>
              <option value="likes">Most Liked</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <div
              className={`tab ${
                activeTab === "blogs" ? "active" : ""
              } start-btn`}
              onClick={() => setActiveTab("blogs")}
            >
              📘 Blog Posts ({blogs.length})
            </div>

            <div
              className={`tab ${activeTab === "discussions" ? "active" : ""}`}
              onClick={() => setActiveTab("discussions")}
            >
              💬 Discussions ({discussions.length})
            </div>
          </div>

          {/* ---- POSTS LIST ---- */}
          {filteredPosts.length === 0 ? (
            <div className="post-card">
              <p className="text-center text-muted">
                No {activeTab === "blogs" ? "blog posts" : "discussions"} found.
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.content}</p>

                <div className="meta">
                  <span>👤 {post.author}</span>
                  <span className="badge">{post.category}</span>
                  <span>{post.date}</span>
                </div>

                <div className="post-actions">
                  <button
                    className={`action-btn ${post.likedBy?.includes("andrew4366") ? "liked" : ""}`}
                    onClick={() => toggleLike(post.id, activeTab === "blogs" ? "blog" : "discussion")}
                  >
                    <FaThumbsUp /> {post.likes || 0}
                  </button>
                  <button
                    className={`action-btn ${post.bookmarked ? "bookmarked" : ""}`}
                    onClick={() => toggleBookmark(post.id, activeTab === "blogs" ? "blog" : "discussion")}
                  >
                    <FaBookmark /> {post.bookmarked ? "Saved" : "Save"}
                  </button>
                  {post.author === currentUser && (
                    <button
                      className="action-btn delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost(post.id, activeTab === "blogs" ? "blog" : "discussion");
                      }}
                      title="Delete this post"
                    >
                      <FaTrash /> Delete
                    </button>
                  )}
                  <span className="views-count">👁️ {post.views || 0} views</span>
                </div>

                <div className="tags">
                  {(post.tags || []).map((tag, i) => (
                    <span key={i}>#{tag}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
