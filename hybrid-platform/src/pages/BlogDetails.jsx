import { useParams } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

function BlogDetails() {
  const { id } = useParams();
  const { blogs } = useContext(BlogContext);

  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <h2>Blog not found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <small>
        By {blog.author} on {blog.date}
      </small>
    </div>
  );
}

export default BlogDetails;
