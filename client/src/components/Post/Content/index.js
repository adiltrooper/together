import React from "react";
import styled from "styled-components";
import PostContentTitle from "./Title";
import DetailOne from "./DetailOne";
import PostContentImage from "./Image";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px;
`;

const PostContent = props => {
  return (
    <Wrapper>
      <PostContentImage {...props} />
      <DetailOne {...props} />
      <PostContentTitle {...props} />
    </Wrapper>
  );
};

export default PostContent;
