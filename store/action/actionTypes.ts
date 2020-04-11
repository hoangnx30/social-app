import { ListPostData } from './types';

export const POST_STATUS = 'POST_STATUS';
export const EDIT_STATUS = 'EDIT_STATUS';
export const DELETE_STATUS = 'DELETE_STATUS';
export const SET_POST_DATA = 'SET_POST_DATA';
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

export type PostActionType = PostStatusAction | EditStatusAction | DeleteStatusAction | SetPostData;
