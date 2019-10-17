import React from "react";
import styled from "styled-components";

const SearchBarInput = styled.input`
  background-color: #F9F9F9;
  border: 0;
  font-size: 60px;
  padding: 12px 40px;
  font-family: Source Sans Pro;
  font-weight: 600
  border-radius: 20px;
  margin-top: 10px;
  color: #2D1E7B;

  :focus {
    outline: none;
    box-shadow: 0px 0px 3px rgba(0, 123, 255, 0.5);
  }

  ::placeholder {
  color: #2D1E7B;



`;

export default SearchBarInput;
