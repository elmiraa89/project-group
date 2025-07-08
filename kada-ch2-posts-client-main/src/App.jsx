import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import First from "./components/First";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import Login from "./components/Login";
import SignUp from "./components/Signup";


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  
  const showH1 = location.pathname !== "/login" && location.pathname !== "/signup";
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10 px-2 max-w-5xl">
        
        
        <Routes>
          <Route path="/" element={<First />} /> {/* to show first page with options to login or signup */}
          <Route path="/posts" element={<PostList />} /> {/* to show list of posts */}
          <Route path="/new" element={<PostForm />} /> {/* to creat new post */}
          <Route path="/edit/:id" element={<PostForm edit />} /> {/* to edit post*/}
          <Route path="/posts/:id" element={<PostDetail />} /> {/* to view post details */}
          <Route path="/login" element={<Login />} /> {/* to login */}
          <Route path="/signup" element={<SignUp />} /> {/* to signup */}
        </Routes>
      </div>
    </div>
  );
}

export default App;