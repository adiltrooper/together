import React from "react";
import CreateReviewFirstPage from "./CreateReviewFirstPage";
import CreateReviewSecondPage from "./CreateReviewSecondPage";

import ReviewWrapper from "./ReviewWrapper";
import "./ReviewForm.css";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page } = this.state;
    const { onSubmit } = this.props;
    return (
      <ReviewWrapper>
        {/*conditional rendering using logical && */}
        {page === 1 && <CreateReviewFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <CreateReviewSecondPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </ReviewWrapper>
    );
  }
}

export default ReviewForm;
