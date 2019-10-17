import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  text-size: 20px;
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ...props } = this.props;
    //receiving
    return <StyledCard {...props} />;
  }
}

export default Card;
