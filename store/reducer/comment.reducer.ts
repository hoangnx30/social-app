import { CommentActionType, SET_COMMENT_DATA, UPDATE_LISTLIKE_COMMENT, UPDATE_LIST_COMMENT } from '../action/actionTypes';

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
    case UPDATE_LISTLIKE_COMMENT:
      const listDataComment = state.listDataComment;
      for (let i = 0; i < listDataComment.length; i++) {
        if (listDataComment[i].id === action.payload.uid) {
          listDataComment[i].listLike = action.payload.listLikeComment;
        }
      }
      return {
        ...state,
        listDataComment: listDataComment,
      };
    case UPDATE_LIST_COMMENT: {
      return {
        listDataComment: [
          ...state.listDataComment,
          action.payload.newComment
        ]
      }
    }
    default:
      return state;
  }
};
