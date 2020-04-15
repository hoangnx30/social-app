import axios from '../../config/axios-instance';
import { SET_COMMENT_DATA } from './actionTypes';
import { ListCommentData, CommentItem } from './types';

const setListCommentData = (listCommentData: Array<CommentItem>) => {
  return {
    type: SET_COMMENT_DATA,
    payload: {
      listCommentData: listCommentData,
    },
  };
};

export const setListCommentDataAsync = (listComment: Array<string>) => {
  return async (dispatch: any) => {
    const listDataComment: Array<CommentItem> = [];
    for (let index of listComment) {
      const resComment = await axios.get(`listCommentData/${index}.json`);
      const dataComment = resComment.data;
      const dataCommentItem: CommentItem = {
        id: index,
        content: dataComment.content,
        timeUpload: dataComment.timeUpload,
        listLike: dataComment.listlike || [],
        owner: dataComment.owner,
      };
      const resUser = await axios.get(`users/${dataComment.owner}.json`);
      const dataUser = resUser.data;
      dataCommentItem.fullname = dataUser.fullName;
      listDataComment.push(dataCommentItem);
    }
    dispatch(setListCommentData(listDataComment));
  };
};
