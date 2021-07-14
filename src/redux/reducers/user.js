import { UPDATE_USER } from "../actions/user";

// State
//
//{
//  user: {
//    email: string
//    firstName: string
//    lastName: string
//    id: string
//    isAdmin: boolean
//    isSuperAdmin: boolean
//  }
//};

const user = (
  state = {
    user: undefined,
  },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        user,
      };
    default:
      return state;
  }
};

export default user;
