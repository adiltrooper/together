import { combineReducers } from "redux";
import { reducer as reviewFormReducer } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: reviewFormReducer
});
