import { postData } from '../../constants/mock-data';
import { PostActionType, POST_STATUS, EDIT_STATUS, DELETE_STATUS, SET_POST_DATA } from '../action/actionTypes';
const initailState = {
  postData: [],
};

export default function postReducer(state = initailState, action: PostActionType) {
  switch (action.type) {
    case SET_POST_DATA:
      return {
        ...state,
        postData: action.payload.listPostData,
      };
    case POST_STATUS:
      return state;
    case EDIT_STATUS:
      return state;
    case DELETE_STATUS:
      return state;
    default:
      return state;
  }
}
