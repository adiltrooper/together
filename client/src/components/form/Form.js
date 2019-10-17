import React from "react";
import styled from "styled-components";
import FormWrapper from "./Wrapper";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Form = props => {
  return (
    <FormWrapper>
      <StyledForm {...props} />
    </FormWrapper>
  );
};

export default Form;
