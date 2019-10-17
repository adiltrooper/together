import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header/Header";
import Home from "./Home/Home";
import FormIndex from "./CreateReview/FormIndex";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { createGlobalStyle } from "styled-components";

library.add(faSearch);

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
    font-family: 'Open Sans', sans-serif;
    box-sizing: border-box;
  }
`;

const UserDashboard = () => <div>Hello</div>;
const LoginOptions = () => <div />;
const Listing = () => <div>Listing</div>;
const Review = () => <div>Review</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/username" component={UserDashboard} />
            <Route path="/reviews/new" component={FormIndex} />
            <Route path="/login" component={LoginOptions} />
            <Route path="/compose/listing" component={Listing} />
            <Route path="/compose/review" component={Review} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
