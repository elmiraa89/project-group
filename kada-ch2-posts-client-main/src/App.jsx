import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
// Removed useEffect, useState, useNavigate as they are no longer directly managed here for auth controls
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import Login from "./components/Login";
import SignUp from "./components/Signup";
// Removed import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Condition to show/hide the main H1 title
  const showH1 = location.pathname !== "/login" && location.pathname !== "/signup";
  // showAuthControls and related logic removed, as PostList handles this now

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10 px-2 max-w-5xl">
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/new" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm edit />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Removed <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;