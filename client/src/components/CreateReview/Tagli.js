import styled from "styled-components";

const Tagli = styled.li`
  border: 1px solid #ddd;
  background: #eee;
  font-family: Open Sans, sans-serif;
  font-size: 20px;
  display: inline-block;
  padding: 5px;
  margin: 0 5px;
  cursor: move;
  border-radius: 2px;

  :first-child {
    margin: 0 0px;
  }
`;

export default Tagli;
