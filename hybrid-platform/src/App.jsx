


// import Blogs from "./pages/Blogs";
// import BlogDetails from "./pages/BlogDetails";
// import CreateBlog from "./pages/CreateBlog";
// import Profile from "./pages/Profile";
// import Discussions from "./pages/Discussions";
// import DiscussionDetails from "./pages/DiscussionDetails";
// import AskQuestion from "./pages/AskQuestion";
// import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";
import PostCard from "./pages/PostCard";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/back" element={<Dashboard />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post/:id" element={<PostCard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
   
  );
}

export default App;
