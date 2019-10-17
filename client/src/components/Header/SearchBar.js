import React from "react";
import HeaderInput from "./Input";
import styled from "styled-components";
import { headerItem } from "../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  ${headerItem};
  width: 100%;
`;

const SearchBar = () => {
  return (
    <Wrapper>
      <FontAwesomeIcon icon="search" size="lg" style={{ color: "#efefef" }} />
      <HeaderInput />
    </Wrapper>
  );
};
export default SearchBar;
