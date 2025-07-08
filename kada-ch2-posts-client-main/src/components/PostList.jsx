import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/posts";
import { Link, useNavigate } from "react-router-dom";

function PostList() {
  // State for posts
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // State for logged-in user information
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check login status and fetch user data on component mount
  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        try {
          // Fetch user details from the backend
          const res = await fetch("http://localhost:3000/auth/me", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Send cookies with the request
          });

          if (res.ok) {
            const userData = await res.json();
            setLoggedInUser(userData.username); // Set username from fetched data
            localStorage.setItem('username', userData.username); // Update localStorage with username
          } else {
            // If fetching user fails (e.g., token expired, unauthorized)
            console.error("Failed to fetch user data:", res.status);
            localStorage.removeItem('username');
            localStorage.removeItem('isLoggedIn');
            setLoggedInUser(null);
            navigate("/login"); // Redirect to login
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem('username');
          localStorage.removeItem('isLoggedIn');
          setLoggedInUser(null);
          navigate("/login"); // Redirect to login on network error
        }
      } else {
        setLoggedInUser(null); // Ensure loggedInUser is null if not explicitly logged in
        localStorage.removeItem('username'); // Clean up stale username if isLoggedIn is not true
      }
    };

    checkAuthAndFetchUser();
  }, [navigate]); // Add navigate to dependency array

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Call backend logout endpoint to clear server-side session/cookie
      const res = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
        setLoggedInUser(null);
        navigate("/login"); // Redirect to login page after logout
      } else {
        console.error("Failed to logout on server.");
        // Even if server logout fails, clear client-side state
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
        setLoggedInUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Clear client-side state on network error
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
      setLoggedInUser(null);
      navigate("/login");
    }
  };

  // Fetch posts when PostList mounts or on dependency changes
  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p._id !== id));
  };

  // Filter posts by title or content
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handlers for pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Reset to page 1 on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      {/* Navbar Section */}
      <nav className="bg-white p-4 shadow-md flex justify-between items-center mb-6 rounded-lg">
        {/* Left side: Main Title/Brand if any */}
        <div className="text-xl font-bold text-blue-600">
          <Link to="/" className="hover:underline">Here's The List of Posts</Link>
        </div>

        {/* Right side: Profile and Auth Controls */}
        <div className="flex items-center gap-4">
          {loggedInUser ? ( // If a user is logged in
            <>
              {/* Profile Section (Username) */}
              <div className="flex items-center gap-2">
                {/* You can add a profile icon here if you have one, e.g., <img src="/path/to/profile-icon.png" alt="Profile" className="w-6 h-6 rounded-full" /> */}
                <span className="text-gray-700 font-medium">Welcome, {loggedInUser}!</span>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:underline hover:text-blue-800"
              >
                Logout
              </button>
            </>
          ) : ( // If no user is logged in
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:underline hover:text-blue-800 font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Searchbar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* New Post Button - Always visible, underneath searchbar */}
      <div className="flex justify-end mb-6">
        <Link
          to="/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm font-semibold"
        >
          + New Post
        </Link>
      </div>

      {/* Posts List */}
      <div className="grid gap-6">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500">No posts found. Try a different search or create one!</p>
        ) : (
          currentPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded shadow p-4 flex flex-col gap-2"
            >
              <Link to={`/posts/${post._id}`}>
                <h3 className="text-lg font-bold text-blue-700 hover:underline">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-700 line-clamp-3">{post.content}</p>
              {loggedInUser && ( // Only show edit/delete if logged in
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap items-center">
          {/* Prev (no circle) */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-lg transition rounded ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            &lt;
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next (no circle) */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-lg transition rounded ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;