import { combineReducers } from "redux";
import user from "./user";
import token from "./token";
import status from "./status";

export default combineReducers({ token, user, status });
