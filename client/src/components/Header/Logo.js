import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { headerItem } from "../helpers";
import logo from "../../img/togather.png";

const Logo = styled(Link)`
  ${headerItem};
`;
const HeaderLogo = () => (
  <Logo to="/">
    <img src={logo} />
  </Logo>
);

export default HeaderLogo;
