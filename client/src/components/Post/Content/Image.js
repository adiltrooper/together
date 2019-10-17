import React from "react";
import styled from "styled-components";

const Wrapper = styled.img`
  display: block;
  border: 2px solid red;
  width: 100%;
`;

const PostContentImage = props => {
  return <Wrapper src={props.item.imageSrc} />;
};

export default PostContentImage;
