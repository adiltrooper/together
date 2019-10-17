import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  font-size: 11px;
  font-family: Source sans pro;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 5px;
`;

const SpanWrapper = styled.span`
  font-weight: 1000;
  margin: auto 3px;
`;

const DetailOne = props => {
  return (
    <Wrapper>
      {props.item.category}
      <SpanWrapper>&middot;</SpanWrapper>
      {props.item.location}
    </Wrapper>
  );
};

export default DetailOne;
