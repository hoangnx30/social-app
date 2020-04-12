import { AuthActionType, LOG_IN } from '../action/actionTypes';

const initialState = {
  userInfo: {
    accessToken: '',
    refreshToken: '',
    expirationTime: '',
    uid: '',
  },
};

export default (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    default:
      return state;
  }
};
