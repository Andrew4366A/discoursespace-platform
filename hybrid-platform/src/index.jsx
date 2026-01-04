import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BlogProvider } from "./context/BlogContext";
import { DiscussionProvider } from "./context/DiscussionContext";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import "bootstrap/dist/css/bootstrap.min.css";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PostProvider>
    <BlogProvider>
      <AuthProvider>
        <DiscussionProvider>
          <App />
        </DiscussionProvider>
      </AuthProvider>
    </BlogProvider>
  </PostProvider>
);
