import React from "react";
import styled from "styled-components";
import MainSearchBar from "../../SearchBar/MainSearchBar";
import SearchHeading from "./SearchHeading";
import SearchBarInput from "../../SearchBar/SearchBarInput";
import Button from "../../shared/Button";
import PostList from "../../PostList/PostList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  height: 100%;
  border: 1px solid red;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 50px;
  margin-top: 30px;
  width: 400px;
`;

class TopDiv extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <SearchHeading>
          Search for Activities, Dates and Itineries
        </SearchHeading>
        <MainSearchBar />
        <ButtonWrapper>
          <Button primary>Search</Button>
          <Button>Surprise Me</Button>
        </ButtonWrapper>
        <PostList />
      </Wrapper>
    );
  }
}

export default TopDiv;
