import React from "react";
import { Post } from "../../types";
import styles from "./PostCard.module.css";

interface Props {
  post: Post;
  onSelect: (postId: number) => void;
}

const PostCard: React.FC<Props> = ({ post, onSelect }) => {
  const flaggedCount = post.comments?.filter((c) => c.flagged).length || 0;

  return (
    <div className={styles.card} onClick={() => onSelect(post.id)}>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.body}>{post.body}</div>
      {flaggedCount > 0 && (
        <div className={styles.commentSummary}>
          {flaggedCount} flagged comment{flaggedCount > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default PostCard;
