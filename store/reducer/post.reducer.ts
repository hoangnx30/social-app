import {
  PostActionType,
  POST_STATUS,
  EDIT_STATUS,
  DELETE_STATUS,
  SET_POST_DATA,
  UPDATE_LISTLIKE,
} from '../action/actionTypes';
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
    case UPDATE_LISTLIKE:
      const postDataUpdated = state.postData;
      for (let i = 0; i < postDataUpdated.length; i++) {
        if (postDataUpdated[i].id === action.payload.uid) {
          postDataUpdated[i].listLike = action.payload.listLike;
        }
      }
      return {
        ...state,
        postData: postDataUpdated,
      };
    default:
      return state;
  }
}
