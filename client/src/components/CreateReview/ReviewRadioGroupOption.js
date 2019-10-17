import React from "react";
import styled from "styled-components";
import RadioLabel from "./RadioLabel";

const ReviewRadioGroupOption = props => {
  return (
    <>
      <RadioLabel htmlFor={props.value}>{props.label}</RadioLabel>
      <input type="radio" name="radiogroup" id={props.value} />
    </>
  );
};

export default ReviewRadioGroupOption;
