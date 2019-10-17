import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: Source Sans Pro;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  justify-content: center;
  margin: auto 15px;
  width: 140px;
  height: 40px;
  border-radius: 20px;
  color: #ffffff;
  background-color: ${props => {
    if (props.primary) return "#05beb9";
    return "#2d1e7b";
  }};

  :focus {
    outline: none;
    box-shadow: 0px 0px 3px rgba(0, 123, 255, 0.5);
  }
`;

const Button = ({ primary, ...props }) => {
  return <StyledButton primary={primary} {...props} />;
};

export default Button;
