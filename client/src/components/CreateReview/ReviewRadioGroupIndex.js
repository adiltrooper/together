import React from "react";
import styled from "styled-components";
import ReviewRadioGroupOption from "./ReviewRadioGroupOption";

const RadioGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  border 1px solid red;
  input[type="radio"] {
    
  }
`;

const renderOptions = () => {
  return <ReviewRadioGroupOption />;
};

const RadioGroup = ({ field }) => (
  <RadioGroupWrapper>{renderOptions(field)}</RadioGroupWrapper>
);

export default RadioGroup;
