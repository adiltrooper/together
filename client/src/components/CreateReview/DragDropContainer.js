import React from "react";
import DragAndDrop from "./DragAndDrop";

class DragDropContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        "nice.pdf",
        "verycool.jpg",
        "amazing.png",
        "goodstuff.mp3",
        "thankyou.doc"
      ]
    };
  }

  handleDrop = files => {
    let fileList = this.state.files;
    for (let i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i].name);
    }
    this.setState({ files: fileList });
  };

  render() {
    return (
      <DragAndDrop name="listingImage" type="file" handleDrop={this.handleDrop}>
        <div style={{ height: 300, width: 250 }}>
          {this.state.files.map(file => (
            <div key={file.name}>{file}</div>
          ))}
        </div>
      </DragAndDrop>
    );
  }
}

export default DragDropContainer;
