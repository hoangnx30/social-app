import { ListPostData, ListCommentData } from './types';
import { UserInfo } from './types';

export const POST_STATUS = 'POST_STATUS';
export const EDIT_STATUS = 'EDIT_STATUS';
export const DELETE_STATUS = 'DELETE_STATUS';
export const SET_POST_DATA = 'SET_POST_DATA';
export const UPDATE_LISTLIKE = 'UPDATE_LISTLIKE';

export const LOG_IN = 'LOG_IN';

export const SET_COMMENT_DATA = 'SET_COMMENT_DATA';
export const UPDATE_LISTLIKE_COMMENT = 'UPDATE_LISTLIKE_COMMENT';

interface PostStatusAction {
  type: typeof POST_STATUS;
  payload: {};
}

interface EditStatusAction {
  type: typeof EDIT_STATUS;
  payload: {};
}

interface DeleteStatusAction {
  type: typeof DELETE_STATUS;
  payload: {};
}

interface UpdateListLike {
  type: typeof UPDATE_LISTLIKE;
  payload: {
    listLike: Array<string>;
    uid: string;
  };
}

interface SetPostData {
  type: typeof SET_POST_DATA;
  payload: {
    listPostData: ListPostData;
  };
}

interface Login {
  type: typeof LOG_IN;
  payload: {
    userInfo: UserInfo;
  };
}

interface SetCommentData {
  type: typeof SET_COMMENT_DATA;
  payload: {
    listCommentData: ListCommentData;
  };
}

interface UpdateListLikeComment {
  type: typeof UPDATE_LISTLIKE_COMMENT;
  payload: {
    listLikeComment: Array<string>;
    uid: string;
  };
}
export type PostActionType = PostStatusAction | EditStatusAction | DeleteStatusAction | SetPostData | UpdateListLike;
export type AuthActionType = Login;
export type CommentActionType = SetCommentData | UpdateListLikeComment;
