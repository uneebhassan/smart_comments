import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Post, Comment as CommentType } from "../../types";
import Comment from "../../components/Comment/Comment";
import styles from "./PostDetail.module.css";

interface Props {
  postId: number;
}

const PostDetail: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const fetchPost = () => {
    api.get(`/posts/${postId}/`).then((res) => setPost(res.data));
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleAddComment = async () => {
    if (!author || !text) return;
    await api.post(`/posts/${postId}/comments/`, { author, text });
    setAuthor("");
    setText("");
    fetchPost();
  };

  return (
    <div className={styles.container}>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>

          <h3>Comments</h3>
          <ul className={styles.comments}>
            {post.comments?.map((c: CommentType) => (
              <li key={c.id}>
                <Comment comment={c} />
              </li>
            ))}
          </ul>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className={styles.submitButton} onClick={handleAddComment}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
