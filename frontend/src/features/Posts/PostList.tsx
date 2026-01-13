import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Post } from "../../types";
import PostCard from "../../components/PostCard/PostCard";

interface Props {
  onSelectPost: (postId: number) => void;
}

const PostList: React.FC<Props> = ({ onSelectPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/posts/").then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onSelect={onSelectPost} />
      ))}
    </div>
  );
};

export default PostList;
