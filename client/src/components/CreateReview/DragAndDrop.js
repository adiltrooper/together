import React from "react";
import DropArea from "./DropArea";

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false
    };

    this.dropArea = React.createRef();
  }

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    this.setState({ dragging: false });
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  componentDidMount() {
    this.dragCounter = 0;
    let div = this.dropArea.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropArea.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }

  render() {
    return (
      <DropArea
        style={{ display: "inline-block", position: "relative" }}
        ref={this.dropArea}
      >
        {this.state.dragging && (
          <div
            style={{
              border: "dashed grey 4px",
              backgroundColor: "rgba(255,255,255,.8)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "grey",
                fontSize: 36
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        )}
        {this.props.children}
        {console.log(this.props.children)}
      </DropArea>
      // <form class="my-form">
      //   <p>
      //     Upload multiple files with the file dialog or by dragging and
      //     dropping images onto the dashed region
      //   </p>
      //   <input
      //     type="file"
      //     id="fileElem"
      //     multiple
      //     accept="image/*"
      //     onchange="handleFiles(this.files)"
      //   />
      //   <label class="button" for="fileElem">
      //     Select some files
      //   </label>
      // </form>
    );
  }
}

export default DragAndDrop;
