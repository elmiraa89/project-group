import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPost, getComments, deleteComment, deletePost } from "../api/posts";
import CommentForm from "./CommentForm";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPost(id).then(setPost);
    getComments(id).then(setComments);
  }, [id]);

  const handleDeleteComment = async (commentId) => {
    await deleteComment(id, commentId);
    setComments(comments.filter(c => c._id !== commentId));
  };
  const handleDeletePost = async () => {
    await deletePost(id);
    navigate("/");
  };

  return (
    <div>
      <Link to="/" className="text-blue-500 hover:underline">&larr; Back to posts</Link>
      {post && (
        <div className="bg-white rounded shadow p-6 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <div>
              <Link to={`/edit/${id}`} className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</Link>
              <button onClick={handleDeletePost} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
          <p className="text-gray-700">{post.content}</p>
          <hr className="my-4"/>
          <h3 className="font-semibold mb-2">Comments</h3>
          <div className="space-y-2 mb-4">
            {comments.length === 0 && <p className="text-gray-400 text-sm">No comments yet.</p>}
            {comments.map(comment =>
              <div key={comment._id} className="flex justify-between items-center bg-gray-50 rounded p-2">
                <span>{comment.content}</span>
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >Delete</button>
              </div>
            )}
          </div>
          <CommentForm
            postId={id}
            onComment={c => setComments(prev => [...prev, c])}
          />
        </div>
      )}
    </div>
  );
}

export default PostDetail;