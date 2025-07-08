import { useState } from "react";
import { addComment } from "../api/posts"; // this function for send comment to backend

function CommentForm({ postId, onComment }) { // Receives postId and a callback to update comments 
  const [content, setContent] = useState(""); // for store the inputted comment
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent the default form submission behavior 
    if (!content.trim()) return; 

    setLoading(true); 
    try {
      const newComment = await addComment(postId, content); // Call API to add the comment
      onComment(newComment); // Notify the parent component with the new comment
      setContent(""); // Clear the input field after successful submission
    } catch {

    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input
        value={content} // controlled input
        onChange={e => setContent(e.target.value)} // Update content state on input change
        placeholder="Add a comment"
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        disabled={loading} // Disable the input while loading
      />
      <button
        type="submit"
        disabled={loading} // Disable the button while loading
        className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition disabled:bg-blue-200"
      >
        {loading ? "Posting..." : "Comment"} 
      </button>
    </form>
  );
}

export default CommentForm; 
