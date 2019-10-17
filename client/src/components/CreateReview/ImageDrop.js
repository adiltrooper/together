import React from "react";

const ImageDrop = props => {
  return (
    <div>
      <div {...props}>
        <input type="file" />
      </div>
    </div>
  );
};

export default ImageDrop;
