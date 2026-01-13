import React from "react";
import { Comment as CommentType } from "../../types";
import styles from "./Comment.module.css";

interface Props {
  comment: CommentType;
}

const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div className={`${styles.comment} ${comment.flagged ? styles.flagged : ""}`}>
      <strong>{comment.author}</strong>: {comment.text}
      {comment.flagged && " (Flagged)"}
    </div>
  );
};

export default Comment;
