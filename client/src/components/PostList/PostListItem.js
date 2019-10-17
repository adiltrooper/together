import React from "react";
import Card from "../shared/Card";
import Post from "../Post";

const PostListItem = props => {
  return (
    <Card>
      <Post {...props} />
    </Card>
  );
};

export default PostListItem;
