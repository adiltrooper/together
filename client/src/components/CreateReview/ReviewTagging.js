import React from "react";
import ReviewInput from "./ReviewInput";
import Tagli from "./Tagli";
import InputStyleHelper from "./InputStyleHelper";

const SPACE_KEY = 32;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;

class ReviewTagging extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [], value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onChange(this.state.tags);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyUp(e) {
    const key = e.keyCode;
    if (key === SPACE_KEY || key === COMMA_KEY) {
      this.addTag();
    } else {
      return;
    }
  }

  handleKeyDown(e) {
    const key = e.keyCode;

    if (key === BACKSPACE_KEY && !this.state.value) {
      this.editTag();
    }
  }

  addTag() {
    const tags = this.state.tags;
    const value = this.state.value;

    let tag = value.trim();

    tag = tag.replace(/,/g, "");

    if (!tag) {
      return;
    }
    this.setState({ tags: [...tags, tag], value: "" });
  }

  editTag() {
    let tags = this.state.tags;
    const tag = tags.pop();

    this.setState({ tags, value: tag });
  }

  render() {
    const tags = this.state.tags;
    return (
      <div>
        <InputStyleHelper>
          <ul {...this.props}>
            {tags.map((tag, i) => (
              <Tagli key={tag + i}>{tag}</Tagli>
            ))}
          </ul>
          <ReviewInput
            {...this.props}
            placeholder="Add tags..."
            value={this.state.value}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onKeyDown={this.handleKeyDown}
          />
        </InputStyleHelper>
      </div>
    );
  }
}

export default ReviewTagging;
