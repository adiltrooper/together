import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  font-family: Source Sans Pro semibold;
  font-size: 15px;
  text-decoration: none;
  margin-top: 5px;
`;

const PostContentTitle = props => {
  return <Wrapper>{props.item.name}</Wrapper>;
};

export default PostContentTitle;
