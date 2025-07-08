import { Link } from "react-router-dom";

export default function First() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome!!</h1>
        <p className="text-gray-600 mb-8">Please choose an option to continue</p>

        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-medium transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
