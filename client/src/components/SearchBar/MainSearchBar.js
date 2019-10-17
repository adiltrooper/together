import React from "react";
import SearchBarInput from "./SearchBarInput";

class MainSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: "Search for Activities, Dates and Itineries.",
      dataText: [
        "Next Date Idea?",
        "Playnation Date",
        "Mellower Coffee",
        "Haji Lane Walkabout",
        "Sentosa Beach Day"
      ],
      text: "",
      isDeleting: false,
      loopNum: 0,
      typingSpeed: 150,
      clicked: false
    };
  }

  componentDidMount() {
    this.handleType();
  }

  handleType = () => {
    const { dataText } = this.state;
    const { isDeleting, loopNum, text, typingSpeed, clicked } = this.state;
    const i = loopNum % dataText.length;
    const fullText = dataText[i];

    if (isDeleting && clicked === false) {
      this.setState({
        text: fullText.substring(0, text.length - 1),
        typingSpeed: 30
      });
    } else if (isDeleting === false && clicked === false) {
      this.setState({
        text: fullText.substring(0, text.length + 1),
        typingSpeed: 150
      });
    } else if (clicked === true) {
      this.setState({ text: "", typingSpeed: 0 });
    }

    // this.setState({
    //   text: isDeleting
    //     ? fullText.substring(0, text.length - 1)
    //     : fullText.substring(0, text.length + 1),
    //   typingSpeed: isDeleting ? 30 : 150
    // });

    if (!isDeleting && text === fullText) {
      setTimeout(() => this.setState({ isDeleting: true }), 500);
    } else if (isDeleting && text === "") {
      this.setState({
        isDeleting: false,
        loopNum: loopNum + 1
      });
    }

    setTimeout(this.handleType, typingSpeed);
  };

  handleClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    return (
      <div>
        <SearchBarInput
          placeholder={this.state.text}
          onClick={this.handleClick}
        />
        <span id="cursor" />
      </div>
    );
  }
}

export default MainSearchBar;
