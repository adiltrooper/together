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

function validate(values) {
  const errors = {};
  console.log(values.activity_name);

  if (!values.foursquare_id) {
    errors.foursquare_id = "You must provide a location!";
  }

  if (!values.activity_name) {
    errors.activity_name = "Don't forget to tell us what you did!";
  }

  if (!values.tags || !values.tags.length) {
    errors.tags = "please enter at least one tag";
  }

  // function checkTags(values) {
  //   if (!values[0]) {
  //     return "HELLO";
  //   }
  // }
  //
  // errors.tags = checkTags(values.tags || []);

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "newListing",
  destroyOnUnmount: false
})(CreateReviewFirstPage);
