import { UPDATE_TOKEN } from "../actions/token";

const token = (state = sessionStorage.getItem("jwt"), { type, payload }) => {
  switch (type) {
    case UPDATE_TOKEN:
      return payload;
    default:
      return state;
  }
};

export default token;
