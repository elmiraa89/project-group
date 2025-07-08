// to show many list of comments for a post

import React from "react";

const CommentList = ({ comments }) => (
  <div>
    <h3>Comments</h3>
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <strong>{comment.author}:</strong> {comment.text}
        </li>
      ))}
    </ul>
  </div>
);

export default CommentList;
