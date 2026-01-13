import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Post, Comment } from "../../types";
import styles from "./Moderator.module.css";

const Moderator: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/posts/morderator/").then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>Flagged Comments</h2>
      {posts.map((post) => (
        <div key={post.id} className={styles.postContainer}>
          <h3>{post.title}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {post.comments && post.comments.filter((c) => c.flagged).length > 0 ? (
            post.comments
                .filter((c) => c.flagged)
                .map((c) => (
                <li key={c.id} className={styles.flaggedComment}>
                    {c.author}: {c.text}
                </li>
                ))
            ) : (
            <li>No flagged comments</li>
            )}

          </ul>
        </div>
      ))}
    </div>
  );
};

export default Moderator;
