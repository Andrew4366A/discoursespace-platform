import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

  const fetchJson = async (path, options = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    // Simple bootstrap fetch; falls back to local seed data if API is down.
    const loadPosts = async () => {
      try {
        const [blogsRes, discussionsRes] = await Promise.all([
          fetchJson("/blogs"),
          fetchJson("/discussions"),
        ]);
        setBlogs(Array.isArray(blogsRes) ? blogsRes : []);
        setDiscussions(Array.isArray(discussionsRes) ? discussionsRes : []);
      } catch (err) {
        console.warn("Falling back to seed posts:", err.message);
        setBlogs([
          {
            id: 1,
            title: "Getting Started with AI",
            content: "This is a guide about AI and machine learning…",
            author: "testuser",
            date: "11/17/2025",
            category: "Technology",
            tags: ["ai", "tutorial"],
            likes: 12,
            likedBy: [],
            comments: [],
            bookmarked: false,
            views: 45,
          },
          {
            id: 2,
            title: "Test Blog Post",
            content: "This is a test blog post content for automated testing…",
            author: "testuser15848",
            date: "11/17/2025",
            category: "Other",
            tags: ["test", "automation", "api"],
            likes: 5,
            likedBy: [],
            comments: [],
            bookmarked: false,
            views: 23,
          },
        ]);
        setDiscussions([
          {
            id: 1,
            title: "Is AI going too far?",
            content: "People are debating whether AI should be regulated…",
            author: "alex_900",
            date: "11/18/2025",
            category: "Technology",
            tags: ["ai", "ethics"],
            likes: 8,
            likedBy: [],
            comments: [],
            bookmarked: false,
            views: 67,
          },
          {
            id: 2,
            title: "Which programming language should I learn first?",
            content: "I'm confused between Python, JavaScript, and Java…",
            author: "newbie_dev",
            date: "11/18/2025",
            category: "Education",
            tags: ["programming", "learning"],
            likes: 15,
            likedBy: [],
            comments: [],
            bookmarked: false,
            views: 89,
          },
        ]);
      }
    };

    loadPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // create helpers
  const addBlog = (blog) =>
    setBlogs((p) => [
      ...p,
      {
        id: Date.now(),
        likes: 0,
        likedBy: [],
        comments: [],
        bookmarked: false,
        views: 0,
        ...blog,
      },
    ]);
  const addDiscussion = (d) =>
    setDiscussions((p) => [
      ...p,
      {
        id: Date.now(),
        likes: 0,
        likedBy: [],
        comments: [],
        bookmarked: false,
        views: 0,
        ...d,
      },
    ]);
  const addCommunity = (c) =>
    setCommunities((p) => [...p, { id: Date.now(), ...c }]);

  // delete helpers
  const deleteBlog = (id) => {
    setBlogs((p) => p.filter((b) => b.id !== id));
    setBookmarkedPosts((prev) =>
      prev.filter((b) => !(b.id === id && b.type === "blog"))
    );
  };
  const deleteDiscussion = (id) => {
    setDiscussions((p) => p.filter((d) => d.id !== id));
    setBookmarkedPosts((prev) =>
      prev.filter((b) => !(b.id === id && b.type === "discussion"))
    );
  };
  const deleteCommunity = (id) =>
    setCommunities((p) => p.filter((c) => c.id !== id));

  // like/unlike helpers
  const toggleLike = (id, type = "blog") => {
    const currentUser = "andrew4366"; // Get from auth context later
    if (type === "blog") {
      setBlogs((p) =>
        p.map((post) => {
          if (post.id === id) {
            const isLiked = post.likedBy.includes(currentUser);
            return {
              ...post,
              likes: isLiked ? post.likes - 1 : post.likes + 1,
              likedBy: isLiked
                ? post.likedBy.filter((u) => u !== currentUser)
                : [...post.likedBy, currentUser],
            };
          }
          return post;
        })
      );
    } else {
      setDiscussions((p) =>
        p.map((post) => {
          if (post.id === id) {
            const isLiked = post.likedBy.includes(currentUser);
            return {
              ...post,
              likes: isLiked ? post.likes - 1 : post.likes + 1,
              likedBy: isLiked
                ? post.likedBy.filter((u) => u !== currentUser)
                : [...post.likedBy, currentUser],
            };
          }
          return post;
        })
      );
    }
  };

  // bookmark helpers
  const toggleBookmark = (id, type = "blog") => {
    if (type === "blog") {
      setBlogs((p) =>
        p.map((post) => {
          if (post.id === id) {
            const newBookmarked = !post.bookmarked;
            if (newBookmarked) {
              setBookmarkedPosts((prev) => [...prev, { id, type: "blog" }]);
            } else {
              setBookmarkedPosts((prev) =>
                prev.filter((b) => !(b.id === id && b.type === "blog"))
              );
            }
            return { ...post, bookmarked: newBookmarked };
          }
          return post;
        })
      );
    } else {
      setDiscussions((p) =>
        p.map((post) => {
          if (post.id === id) {
            const newBookmarked = !post.bookmarked;
            if (newBookmarked) {
              setBookmarkedPosts((prev) => [...prev, { id, type: "discussion" }]);
            } else {
              setBookmarkedPosts((prev) =>
                prev.filter((b) => !(b.id === id && b.type === "discussion"))
              );
            }
            return { ...post, bookmarked: newBookmarked };
          }
          return post;
        })
      );
    }
  };

  // comment helpers
  const addComment = (postId, comment, type = "blog") => {
    const currentUser = "andrew4366";
    if (type === "blog") {
      setBlogs((p) =>
        p.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: currentUser,
                  content: comment,
                  date: new Date().toLocaleDateString(),
                },
              ],
            };
          }
          return post;
        })
      );
    } else {
      setDiscussions((p) =>
        p.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: currentUser,
                  content: comment,
                  date: new Date().toLocaleDateString(),
                },
              ],
            };
          }
          return post;
        })
      );
    }
  };

  // notification helpers
  const addNotification = (notification) => {
    setNotifications((prev) => [
      { id: Date.now(), read: false, ...notification },
      ...prev,
    ]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <PostContext.Provider
      value={{
        blogs,
        discussions,
        communities,
        bookmarkedPosts,
        notifications,
        addBlog,
        addDiscussion,
        addCommunity,
        deleteBlog,
        deleteDiscussion,
        deleteCommunity,
        toggleLike,
        toggleBookmark,
        addComment,
        addNotification,
        markNotificationRead,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
