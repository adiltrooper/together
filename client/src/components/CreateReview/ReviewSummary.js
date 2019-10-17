import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const ReviewSummary = ({
  onCancel,
  listingValues,
  onSubmit,
  submitListing,
  history
}) => {
  return (
    <div>
      ReviewSummary
      <button onClick={onCancel}>Back</button>
      <button
        onClick={() => {
          submitListing(listingValues, history);
          console.log(listingValues);
        }}
      >
        Submit
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { listingValues: state.form.newListing.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(ReviewSummary));
