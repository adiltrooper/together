import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import HeaderLogo from "./Logo";
import SearchBar from "./SearchBar";
import NavigationLink from "./NavigationLink";
import NavALink from "./NavALink";

const Wrapper = styled.header`
  z-index: 10;
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
  height: 64px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    console.log(this.props);
    return (
      <Wrapper>
        <HeaderLogo />
        <SearchBar />
        {this.props.auth == null ? null : this.props.auth ? (
          <>
            <NavALink href="/api/logout">Profile</NavALink>
            <NavigationLink to="/compose/listing">Notifs</NavigationLink>
            <NavigationLink to="/compose/review">Chats</NavigationLink>
          </>
        ) : (
          <NavALink href="/auth/google">Login</NavALink>
        )}
      </Wrapper>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
