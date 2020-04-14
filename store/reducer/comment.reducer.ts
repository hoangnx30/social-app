import { CommentActionType, SET_COMMENT_DATA } from '../action/actionTypes';

const initialState = {
  listDataComment: [],
};

export default (state = initialState, action: CommentActionType) => {
  switch (action.type) {
    case SET_COMMENT_DATA:
      return {
        ...state,
        listDataComment: action.payload.listCommentData,
      };
    default:
      return state;
  }
};
