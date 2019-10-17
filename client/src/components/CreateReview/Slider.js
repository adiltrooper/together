import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;

  value {
    margin-top: 0.5em;
  }

  input[type="range"] {
    -webkit-appearance: none;
    background: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #ccccc8;
    height: 18px;
    width: 18px;
    margin-top: -8px;
    border-radius: 99px;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 300px;
    height: 4px;
    background: #ddd;
  }
`;

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: 50 };
  }

  handleOnChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <Styles>
        <input
          value={this.state.value}
          type="range"
          min={0}
          max={255}
          onChange={this.handleOnChange}
          {...this.props}
        />
        <div className="value">{this.state.value}</div>
      </Styles>
    );
  }
}

export default Slider;
