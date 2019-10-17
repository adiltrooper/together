import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "./renderField";
import DragDropContainer from "./DragDropContainer";

const CreateReviewSecondPage = props => {
  const previousPage = props.previousPage;

  const { handleSubmit, pristine, submitting } = props;

  function imSubmitting(formValues) {
    console.log(formValues);
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Field
        name="duration"
        type="slide"
        label="Duration"
        component={renderField}
      />
      <Field
        name="temporary"
        type="checkbox"
        label="Temporary?"
        component={renderField}
      />
      <Field name="price" type="input" label="Damage" component={renderField} />

      <Field
        name="testfile"
        type="file"
        label="select your file"
        component={renderField}
      />
      <Field
        name="activity_description"
        type="textarea"
        label="Tell us more"
        component={renderField}
      />
      {/*<DragDropContainer name="listingImage" type="file" />*/}
      <div>
        <button type="button" onClick={previousPage}>
          Back
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "newListing",
  destroyOnUnmount: false
})(CreateReviewSecondPage);
