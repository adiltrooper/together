import styled from "styled-components";
import { Link } from "react-router-dom";
import { headerItem } from "../helpers";

const NavigationLink = styled(Link)`
  ${headerItem}

  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: black;
  text-decoration: none;
`;

export default NavigationLink;
