import axios from "axios";
import { FETCH_USER } from "./types";
import { formatListing } from "./formatListing";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// export const submitListing = (values, history) => async dispatch => {
//   const options = formatListing(values);
//   console.log(options);
//
//   const res = await axios.post("/compose/listing", options);
//
//   dispatch({ type: FETCH_USER, payload: res.data });
// };

// export const autoComplete = () => async dispatch => {
//   const res = await fourSquareSuggest.get(``);
//   dispatch({ type: })
// }
// };

export function submitListing(values) {
  const options = formatListing(values);
  return dispatch => {
    fetch("/compose/listing", options).then(payload => {
      dispatch({
        type: FETCH_USER,
        payload: payload.data
      });
    });
  };
}
