import { ListPostData } from './types';
import { UserInfo } from './types';

export const POST_STATUS = 'POST_STATUS';
export const EDIT_STATUS = 'EDIT_STATUS';
export const DELETE_STATUS = 'DELETE_STATUS';
export const SET_POST_DATA = 'SET_POST_DATA';
export const LOG_IN = 'LOG_IN';
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

export type PostActionType = PostStatusAction | EditStatusAction | DeleteStatusAction | SetPostData;
export type AuthActionType = Login;
