# Kada Blog Client

A simple and modern blog frontend built with **Vite + React + Tailwind CSS**.  
Connects to the Kada Blog API server to manage posts and comments.

---

## 🚀 Features

- View, create, edit, and delete blog posts
- Read and write comments on posts (with edit/delete support)
- Responsive, clean UI using Tailwind CSS
- Seamless integration with the Kada Blog API

---

## 🛠️ Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/yourusername/kada-blog-client.git
cd kada-blog-client
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Set up environment variables (optional)**

By default, the client connects to `http://localhost:5000` for the API.  
To use a custom API server, create a `.env` file in the project root:

```env
API_URL=http://localhost:5000
```

### 4. **Start the development server**

```bash
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173) by default.

---

## ⚡ Usage

- **Homepage:** Browse all posts.  
- **Create Post:** Click the "New Post" button to publish a post.
- **Edit/Delete Post:** From a post, click "Edit" or "Delete".
- **Post Details:** Click a post’s title to see its content and comments.
- **Comments:** Add, edit, or delete comments below each post.

---

## 🌐 API Integration

This client expects the Kada Blog API server to be running at the URL defined by `API_URL`.

By default, it's set for local development:  
[http://localhost:5000](http://localhost:5000)

If your backend runs elsewhere, update `.env` accordingly.

---

## 📦 Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

---

## ✨ Screenshots

*Include screenshots/gifs here of the post list, post details, new post form, etc.*

---

## 📝 License

MIT

---

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)

---