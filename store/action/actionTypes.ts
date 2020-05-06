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
export const UPDATE_LIST_COMMENT = 'UPDATE_LIST_COMMENT';

export const CREATE_GROUP = 'CREATE_GROUP';
export const SET_GROUP = 'SET_GROUP';
export const TRANSFORM_DATA = 'TRANSFORM_DATA';

export const SET_LOADING = 'SET_LOADING';

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
    user: Object;
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

interface UpdateListComment {
  type: typeof UPDATE_LIST_COMMENT;
  payload: {
    newComment: Comment;
  };
}

interface CreateGroup {
  type: typeof CREATE_GROUP;
  payload: {
    name: string;
  };
}

interface SetGroup {
  type: typeof SET_GROUP;
  payload: {
    data: Array<any>;
  };
}

interface SetLoading {
  type: typeof SET_LOADING;
  payload: {
    isLoading: boolean;
  };
}

interface TransformData {
  type: typeof TRANSFORM_DATA;
  payload: {
    data: any;
  };
}

export type PostActionType = PostStatusAction | EditStatusAction | DeleteStatusAction | SetPostData | UpdateListLike;
export type AuthActionType = Login | SetLoading;
export type CommentActionType = SetCommentData | UpdateListLikeComment | UpdateListComment;
export type GroupActionType = CreateGroup | SetGroup | TransformData;
