import React from "react";
import ReviewWrapper from "./ReviewWrapper";
import Label from "./Label";
import ReviewInput from "./ReviewInput";
import SearchInput from "./SearchInput";
import InputStyleHelper from "./InputStyleHelper";
import ReviewTagging from "./ReviewTagging";
import RadioGroup from "./ReviewRadioGroupIndex";
import ImageDrop from "./ImageDrop";
import Slider from "./Slider";
import Checkbox from "./Checkbox";

const VariableField = field => {
  switch (field.type) {
    case "textarea":
      return (
        <ReviewWrapper>
          <Label>{field.label}</Label>
          <InputStyleHelper>
            <ReviewInput {...field.input} as="textarea" placeholder="" />
          </InputStyleHelper>
          {field.meta.touched && field.meta.error}
        </ReviewWrapper>
      );

    case "autocomplete-input":
      return (
        <ReviewWrapper>
          <Label>{field.label}</Label>
          <InputStyleHelper>
            <SearchInput {...field.input} />
          </InputStyleHelper>
          {field.meta.touched && field.meta.error}
        </ReviewWrapper>
      );

    case "input":
      return (
        <ReviewWrapper>
          <Label>{field.label}</Label>
          <InputStyleHelper>
            <ReviewInput {...field.input} placeholder="Text here" />
          </InputStyleHelper>
          {field.meta.touched && field.meta.error}
        </ReviewWrapper>
      );

    case "tags":
      console.log(field.meta);
      return (
        <ReviewWrapper>
          <Label>{field.label}</Label>
          <ReviewTagging {...field.input} />
          {field.meta.touched && field.meta.error}
        </ReviewWrapper>
      );

    case "radiogroup":
      return (
        <ReviewWrapper>
          <Label>{field.label}</Label>
          <RadioGroup {...field.input} field={field} />
          {field.meta.touched && field.meta.error}
        </ReviewWrapper>
      );

    case "slide":
      return (
        <ReviewWrapper>
          <Label>{field.label}</Label>
          <Slider {...field.input} />
          {field.meta.touched && field.meta.error}
        </ReviewWrapper>
      );

    case "checkbox":
      return (
        <ReviewWrapper>
          <Label>{field.label}</Label>
          <Checkbox {...field.input} />
          {field.meta.touched && field.meta.error}
        </ReviewWrapper>
      );

    case "file":
      return <ImageDrop {...field.input} />;
  }
};

const renderField = field => {
  //console.log(field);
  return <VariableField {...field} />;
};

export default renderField;
