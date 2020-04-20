import firebase from 'firebase';
import axios from '../../config/axios-instance';
import { SET_COMMENT_DATA, UPDATE_LISTLIKE_COMMENT } from './actionTypes';
import { ListCommentData, CommentItem } from './types';

export const updateNewComment = (userUid: string, content: string, postUid: string) => {
  return async (dispatch: any, getState: any) => {
    const listCommentOfPostRef = firebase.database().ref(`postData/${postUid}/listComment`);
    const timeUpload = Date.now();
    listCommentOfPostRef.push({ owner: userUid, content: content, timeUpload: timeUpload });
  };
};
