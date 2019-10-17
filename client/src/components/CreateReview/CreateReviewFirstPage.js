import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "./renderField";
import Form from "../form/Form";
import SearchInput from "./SearchInput";

const CreateReviewFirstPage = props => {
  const { handleSubmit } = props;
  //props.handlesubmit is automatically provided by reduxForm helper
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Field
        name="foursquare_id"
        type="autocomplete-input"
        label="Where?"
        component={renderField}
      />
      <Field
        name="activity_name"
        type="input"
        label="What did you do?"
        component={renderField}
      />
      <Field
        name="tags"
        type="tags"
        label="Perfect For"
        component={renderField}
      />
      <div>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "newListing",
  destroyOnUnmount: false
})(CreateReviewFirstPage);
