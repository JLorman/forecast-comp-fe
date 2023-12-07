import { DEADLINE_REACHED, UPDATE_STATUS } from "../actions/status";

const status = (
  state = {
    isForecastExpired: false,
    registrationOpen: true,
  },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_STATUS:
      return { ...state, ...payload };
    case DEADLINE_REACHED:
      return {
        ...state,
        isForecastExpired: true,
      };
    default:
      return state;
  }
};

export default status;
