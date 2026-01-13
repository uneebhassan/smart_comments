import React, { useState } from "react";
import PostList from "../features/Posts/PostList";
import PostDetail from "../features/Posts/PostDetail";

const Home: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  return (
    <div>
      <PostList onSelectPost={setSelectedPostId} />
      {selectedPostId && <PostDetail postId={selectedPostId} />}
    </div>
  );
};

export default Home;
