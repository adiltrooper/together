import React from "react";
import ReviewInput from "./ReviewInput";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import { connect } from "react-redux";
import axios from "axios";
import "./SearchInput.css";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      selectedResult: 0,
      displayDropdown: false
    };

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  showDropdown(e) {
    this.setState({ displayDropdown: true }, () => {
      document.addEventListener("click", this.hideDropdown);
    });
  }

  hideDropdown() {
    this.setState({ displayDropdown: false }, () => {
      document.removeEventListener("click", this.hideDropdown);
    });
  }

  handleInputChange = event => {
    this.setState(
      {
        query: event.currentTarget.value,
        showSuggestion: true
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          this.getSuggestions();
        }
      }
    );
  };

  selectItem = result => {
    this.setState(
      {
        query: result.name,
        selectedResult: result.id,
        results: []
      },
      this.props.onChange(result)
    );
  };

  getSuggestions = () => {
    axios
      .get(
        `https://api.foursquare.com/v2/venues/suggestcompletion?near=Singapore&query=${
          this.state.query
        }&limit=5&client_id=31HS3CVYAUL4VPRWTZGDE4AFGOA0LDCPNFCMSYLN1NQTFOHP
&client_secret=WBQSE54PTL3PBWEEIVDLAP2TDZNIKZQQS4JFMGZDLPFALBEQ&v=20190101`
      )
      .then(res => {
        let resultArray = res.data.response.minivenues;
        resultArray.forEach(result => {
          return result.name;
        });
        console.log(resultArray);
        this.setState({
          results: resultArray
        });
      })
      .then(() => {
        this.showDropdown();
      });
  };

  render() {
    return (
      <>
        <ReviewInput
          {...this.props}
          type="text"
          placeholder="Search for..."
          onInput={this.handleInputChange}
          value={this.state.query}
        />

        {this.state.displayDropdown ? (
          <Dropdown>
            {this.state.results.map(result => {
              return (
                <DropdownItem
                  key={result.id}
                  onClick={() => this.selectItem(result)}
                >
                  {result.name}
                </DropdownItem>
              );
            })}
          </Dropdown>
        ) : null}
      </>
    );
  }
}

export default SearchInput;
