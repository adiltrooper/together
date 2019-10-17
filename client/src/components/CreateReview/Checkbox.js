import React from "react";
import NativeCheckbox from "./NativeCheckbox";

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  handleCheckboxChange = e => {
    this.setState({ checked: e.target.checked });
  };

  render() {
    return (
      <div>
        <label>
          <NativeCheckbox
            {...this.props}
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
          />
          <span>Text</span>
        </label>
      </div>
    );
  }
}

export default Checkbox;
