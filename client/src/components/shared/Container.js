import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${props => {
    if (props.full) return 0;
    return "calc((100vw - 1700px) / 2)";
  }};
  padding-right: ${props => {
    if (props.full) return 0;
    return "calc((100vw - 1700px) / 2)";
  }};
`;

export default Container;
