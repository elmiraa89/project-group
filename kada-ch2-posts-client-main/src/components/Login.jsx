import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setMessage(errData.message || "Login failed");
        return;
      }

      const data = await res.json();
      handleSuccessfulLogin(data);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred during login.");
    }
  };

  // Google Sign-In handler
  const handleGoogleSignIn = async (googleResponse) => {
    setMessage("");
    try {
      // The googleResponse object contains the JWT credential
      const res = await fetch("http://localhost:3000/auth/google-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: googleResponse.credential }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setMessage(errData.message || "Google Sign-In failed");
        return;
      }

      const data = await res.json();
      handleSuccessfulLogin(data);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred during Google Sign-In.");
    }
  };

  // Helper function for successful login
  const handleSuccessfulLogin = (data) => {
    setMessage(data.message || "Login success!");
    localStorage.setItem('isLoggedIn', 'true');
    if (data.username) {
      localStorage.setItem('username', data.username);
    }
    navigate("/posts");
  };

  // Initialize Google Sign-In button
  useEffect(() => {
    /* global google */ // This line prevents linting errors for the global 'google' object
    if (window.google) {
      google.accounts.id.initialize({
        // 🚨 Replace with your actual Google Client ID
        client_id: "730959316639-06r7jdm5n8u83uvsgcfjdr9l48eh75mo.apps.googleusercontent.com",
        callback: handleGoogleSignIn,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}
        
        {/* Email/Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In Button Container */}
        <div id="googleSignInButton" className="flex justify-center"></div>
      </div>
    </div>
  );
}