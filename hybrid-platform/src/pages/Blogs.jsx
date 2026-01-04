import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/BlogCard";

function Blogs() {
  const { blogs } = useContext(BlogContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Blogs</h1>
      {blogs.map((item) => (
        <BlogCard key={item.id} blog={item} />
      ))}
    </div>
  );
}

export default Blogs;
