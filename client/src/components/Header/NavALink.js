import styled from "styled-components";
import { headerItem } from "../helpers";

const NavALink = styled.a`
  ${headerItem}

  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: black;
  text-decoration: none;
`;

export default NavALink;
