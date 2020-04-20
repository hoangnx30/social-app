import { AuthActionType, LOG_IN } from '../action/actionTypes';

const initialState = {
  userInfo: {
    accessToken: '',
    refreshToken: '',
    expirationTime: '',
    uid: '',
  },
  user: {},
};

export default (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
