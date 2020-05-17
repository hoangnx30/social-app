import { FETCH_USER } from './../action/actionTypes';
import { UserInfo } from './../action/types';
import { AuthActionType, LOG_IN } from '../action/actionTypes';

interface State {
  userInfo: UserInfo;
  user: {};
  isLoading: boolean;
}

const initialState = {
  userInfo: {
    accessToken: '',
    refreshToken: '',
    expirationTime: '',
    uid: '',
  },
  user: {},
  isLoading: false,
};

export default (state: State = initialState, action: AuthActionType) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        user: action.payload.user,
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload.data,
      };
    default:
      return state;
  }
};
