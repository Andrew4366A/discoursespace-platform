import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([
    {
      id: "1",
      title: "Getting Started with React",
      content: "React makes it painless to create interactive UIs...",
      author: "Andrew",
      date: "2025-01-01",
    },
    {
      id: "2",
      title: "Why JavaScript is Awesome",
      content: "JavaScript is the most popular programming language...",
      author: "John",
      date: "2025-02-15",
    },
  ]);

 
  const addBlog = (title, content, author) => {
    const newBlog = {
      id: uuid(),
      title,
      content,
      author,
      date: new Date().toLocaleDateString(),
    };
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
}
