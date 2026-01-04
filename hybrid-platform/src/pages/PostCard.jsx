import React, { useState } from "react";
import "./PostCard.css";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { FaThumbsUp, FaBookmark, FaShare, FaTrash } from "react-icons/fa";

function PostCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, discussions, toggleLike, toggleBookmark, addComment, deleteBlog, deleteDiscussion, addNotification } = usePosts();
  const [commentText, setCommentText] = useState("");
  const currentUser = "andrew4366"; // Get from auth context later
  
  // Find the post (check both blogs and discussions)
  const post = [...blogs, ...discussions].find((p) => p.id === Number(id));
  const postType = post ? (blogs.find((b) => b.id === post.id) ? "blog" : "discussion") : null;
  const isOwner = post && post.author === currentUser;
  
  if (!post) {
    return (
      <div className="post-card">
        <h2>Post not found</h2>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText, postType);
    setCommentText("");
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      if (postType === "blog") {
        deleteBlog(post.id);
      } else {
        deleteDiscussion(post.id);
      }
      addNotification({
        type: "success",
        message: "Post deleted successfully",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="post-card">
      {/* TITLE + CONTENT */}
      <div className="post-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </div>

      {/* AUTHOR + ACTIONS + DATE */}
      <div className="post-meta">
        <span className="post-author">👤 {post.author}</span>
        <span className="post-date">{post.date}</span>
        <span className="post-category">{post.category}</span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="post-actions">
        <button
          className={`action-btn ${post.likedBy?.includes("andrew4366") ? "liked" : ""}`}
          onClick={() => {
            toggleLike(post.id, postType);
          }}
        >
          <FaThumbsUp /> {post.likes || 0} Likes
        </button>
        <button
          className={`action-btn ${post.bookmarked ? "bookmarked" : ""}`}
          onClick={() => {
            toggleBookmark(post.id, postType);
          }}
        >
          <FaBookmark /> {post.bookmarked ? "Saved" : "Save"}
        </button>
        <button className="action-btn">
          <FaShare /> Share
        </button>
        {isOwner && (
          <button
            className="action-btn delete-btn"
            onClick={handleDeletePost}
            title="Delete this post"
          >
            <FaTrash /> Delete
          </button>
        )}
        <span className="views-count">👁️ {post.views || 0} views</span>
      </div>

      {/* TAGS */}
      <div className="post-tags">
        {(post.tags || []).map((t, i) => (
          <span key={i} className="tag">
            #{t}
          </span>
        ))}
      </div>

      {/* COMMENTS */}
      <div className="comments-section">
        <h4>Comments ({post.comments?.length || 0})</h4>

        <div className="comment-input">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleAddComment();
            }}
          />
          <button onClick={handleAddComment}>Post</button>
        </div>

        <div className="comment-list">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-author">👤 {comment.author}</div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-date">{comment.date}</div>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
