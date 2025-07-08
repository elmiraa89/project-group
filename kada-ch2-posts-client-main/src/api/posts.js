const API_URL = 'http://localhost:5000';

export async function getPosts() {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return res.json();
}

export async function createPost(post) {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  return res.json();
}

export async function updatePost(post) {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

export async function getComments(postId) {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`);
  return res.json();
}

export async function addComment(postId, content) {
  // Make sure to have a POST /comments endpoint on server, or handle accordingly
  const res = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post: postId, content })
  });
  return res.json();
}

export async function deleteComment(postId, commentId) {
  const res = await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE'
  });
  return res.json();
}