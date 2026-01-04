import { createContext, useContext, useState } from "react";

const DiscussionContext = createContext();

export function DiscussionProvider({ children }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to the community!",
      content: "Start by sharing your thoughts.",
    },
  ]);

  const addPost = (newPost) => {
    setPosts((prev) => [...prev, { id: Date.now(), ...newPost }]);
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <DiscussionContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </DiscussionContext.Provider>
  );
}

export function useDiscussion() {
  return useContext(DiscussionContext);
}
