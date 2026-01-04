import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
      }}
    >
      <h2>{blog.title}</h2>
      <p>{blog.content.substring(0, 100)}...</p>
      <small>By {blog.author}</small>
      <br />
      <Link to={`/blog/${blog.id}`}>Read More</Link>
    </div>
  );
}

export default BlogCard;
