import React from "react";
import styled from "styled-components";
import Card from "../shared/Card";
import FlexWrapper from "../shared/FlexWrapper";
import PostListItem from "./PostListItem";
import TempInfo from "../shared/TempInfo";
import Container from "../shared/Container";

class PostList extends React.Component {
  mapPosts = () => {
    return TempInfo.map(item => {
      return <PostListItem item={item} />;
    });
  };

  render() {
    return (
      <Container>
        <FlexWrapper>{this.mapPosts()}</FlexWrapper>
      </Container>
    );
  }
}

export default PostList;
