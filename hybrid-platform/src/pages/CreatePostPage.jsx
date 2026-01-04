import React, { useState } from "react";
import "./CreatePostPage.css";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";

function CreatePostPage() {
  const [activeTab, setActiveTab] = useState("blog");
  const navigate = useNavigate();
  const { addBlog, addDiscussion, addCommunity, addNotification } = usePosts();
  
  // Blog form state
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("Technology");
  const [blogTags, setBlogTags] = useState("");
  
  // Discussion form state
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [discussionContent, setDiscussionContent] = useState("");
  const [discussionCategory, setDiscussionCategory] = useState("Technology");
  const [discussionTags, setDiscussionTags] = useState("");
  
  // Community form state
  const [communityName, setCommunityName] = useState("");
  const [communityDesc, setCommunityDesc] = useState("");
  return (
    <div className="create-container">
      <h6 onClick={() => navigate("/back")}>Back</h6>
      <h1 className="create-title">Create New Post</h1>

      {/* TAB SWITCHER */}
      <div className="create-tabs">
        <button
          className={activeTab === "blog" ? "active" : ""}
          onClick={() => setActiveTab("blog")}
        >
          📄 Blog Post
        </button>
        <button
          className={activeTab === "discussion" ? "active" : ""}
          onClick={() => setActiveTab("discussion")}
        >
          💬 Discussion
        </button>
        <button
          className={activeTab === "community" ? "active" : ""}
          onClick={() => setActiveTab("community")}
        >
          🏛️ Create Community
        </button>
      </div>

      {/* BLOG POST FORM */}
      {activeTab === "blog" && (
        <div className="form-section">
          <label className="label">Title</label>
          <input
            className="input"
            type="text"
            placeholder="Enter title..."
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />

          <label className="label">Content</label>
          <textarea
            className="textarea"
            rows="10"
            placeholder="Write your content..."
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          ></textarea>

          <label className="label">Category</label>
          <select
            className="input"
            value={blogCategory}
            onChange={(e) => setBlogCategory(e.target.value)}
          >
            <option>Technology</option>
            <option>Science</option>
            <option>Art & Design</option>
            <option>Education</option>
            <option>Business</option>
            <option>Gaming</option>
            <option>Lifestyle</option>
            <option>Other</option>
          </select>

          <label className="label">Tags (comma-separated)</label>
          <input
            className="input"
            type="text"
            placeholder="e.g. javascript, tutorial, beginners"
            value={blogTags}
            onChange={(e) => setBlogTags(e.target.value)}
          />

          <button
            className="submit-btn"
            onClick={() => {
              if (!blogTitle || !blogContent) {
                alert("Please fill in all required fields");
                return;
              }
              addBlog({
                title: blogTitle,
                content: blogContent,
                author: "andrew4366",
                date: new Date().toLocaleDateString(),
                category: blogCategory,
                tags: blogTags
                  ? blogTags.split(",").map((t) => t.trim())
                  : [],
              });
              addNotification({
                type: "success",
                message: "Blog post created successfully!",
              });
              navigate("/dashboard");
            }}
          >
            Create Blog Post
          </button>
        </div>
      )}

      {/* DISCUSSION FORM */}
      {activeTab === "discussion" && (
        <div className="form-section">
          <label className="label">Discussion Topic</label>
          <input
            className="input"
            type="text"
            placeholder="Enter discussion topic..."
            value={discussionTitle}
            onChange={(e) => setDiscussionTitle(e.target.value)}
          />

          <label className="label">Description</label>
          <textarea
            className="textarea"
            rows="8"
            placeholder="Describe your discussion..."
            value={discussionContent}
            onChange={(e) => setDiscussionContent(e.target.value)}
          ></textarea>

          <label className="label">Category</label>
          <select
            className="input"
            value={discussionCategory}
            onChange={(e) => setDiscussionCategory(e.target.value)}
          >
            <option>Technology</option>
            <option>Science</option>
            <option>Art & Design</option>
            <option>Education</option>
            <option>Business</option>
            <option>Gaming</option>
            <option>Lifestyle</option>
            <option>Other</option>
          </select>

          <label className="label">Tags (comma-separated)</label>
          <input
            className="input"
            type="text"
            placeholder="e.g. question, help, advice"
            value={discussionTags}
            onChange={(e) => setDiscussionTags(e.target.value)}
          />

          <button
            className="submit-btn"
            onClick={() => {
              if (!discussionTitle || !discussionContent) {
                alert("Please fill in all required fields");
                return;
              }
              addDiscussion({
                title: discussionTitle,
                content: discussionContent,
                author: "andrew4366",
                date: new Date().toLocaleDateString(),
                category: discussionCategory,
                tags: discussionTags
                  ? discussionTags.split(",").map((t) => t.trim())
                  : [],
              });
              addNotification({
                type: "success",
                message: "Discussion created successfully!",
              });
              navigate("/dashboard");
            }}
          >
            Create Discussion
          </button>
        </div>
      )}

      {/* COMMUNITY CREATION FORM */}
      {activeTab === "community" && (
        <div className="form-section">
          <label className="label">Community Name</label>
          <input
            className="input"
            type="text"
            placeholder="e.g. AI Research"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
          />

          <label className="label">Description</label>
          <textarea
            className="textarea"
            rows="8"
            placeholder="Describe your community..."
            value={communityDesc}
            onChange={(e) => setCommunityDesc(e.target.value)}
          ></textarea>

          <button
            className="submit-btn"
            onClick={() => {
              if (!communityName || !communityDesc) {
                alert("Please fill in all required fields");
                return;
              }
              addCommunity({
                name: communityName,
                description: communityDesc,
                creator: "andrew4366",
                members: 1,
              });
              addNotification({
                type: "success",
                message: "Community created successfully!",
              });
              navigate("/dashboard");
            }}
          >
            Create Community
          </button>
        </div>
      )}
    </div>
  );
}

export default CreatePostPage;
