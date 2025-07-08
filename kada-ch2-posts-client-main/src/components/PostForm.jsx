import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createPost, getPost, updatePost } from "../api/posts";

function PostForm({ edit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && id) {
      getPost(id).then(res => {
        setTitle(res.title);
        setContent(res.content);
      });
    }
  }, [edit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      await updatePost({ id, title, content });
      navigate(`/posts/${id}`);
    } else {
      const p = await createPost({ title, content });
      navigate(`/posts/${p._id}`);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 mx-auto">
      <Link to="/" className="text-blue-500 hover:underline text-sm">&larr; Back</Link>
      <h2 className="text-xl font-bold mb-2">{edit ? "Edit Post" : "New Post"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Content"
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-end transition"
        >{edit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default PostForm;