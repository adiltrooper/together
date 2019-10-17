import React from "react";
var FormData = require("form-data");

export function formatListing(values) {
  const formData = new FormData();

  for (const key in values) {
    if (key === "testfile") {
      console.log(values[key][0]);
      formData.append(key, values[key][0]);
    } else if (key === "foursquare_id") {
      formData.append(key, JSON.stringify(values[key]));
    } else {
      console.log(values[key]);
      formData.append(key, values[key]);
    }
  }

  const options = {
    method: "POST",
    body: formData
  };
  return options;
}
