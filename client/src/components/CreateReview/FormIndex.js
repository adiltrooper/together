import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewSummary from "./ReviewSummary";

class FormIndex extends React.Component {
  state = { showSummary: false };

  whenSubmit = () => {
    this.setState({ showSummary: true });
  };

  whenCancel = () => {
    this.setState({ showSummary: false });
  };

  renderContent() {
    if (this.state.showSummary === true) {
      return <ReviewSummary onCancel={this.whenCancel} />;
    }

    return <ReviewForm onSubmit={this.whenSubmit} />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default FormIndex;

//<ReviewForm onSubmit={this.result} />;
