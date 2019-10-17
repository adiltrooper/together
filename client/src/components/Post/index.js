import React from "react";
import styled from "styled-components";
import PostContent from "./Content";

const Wrapper = styled.div`
  display: flex;
  height: auto;
`;

const Post = props => {
  return (
    <Wrapper>
      <PostContent {...props} />
    </Wrapper>
  );
};

export default Post;
