import { useState, useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { addBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(title, content, "Andrew");
    navigate("/blogs");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Write content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="8"
          style={{ width: "100%", padding: "10px" }}
        ></textarea>

        <button
          type="submit"
          style={{ marginTop: "10px", padding: "10px 15px" }}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
