import axios from '../../config/axios-instance';
import { SET_COMMENT_DATA, UPDATE_LISTLIKE_COMMENT } from './actionTypes';
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

export const updateListLikeCommentAsync = (uidComment: string, listLike: Array<string> | undefined) => {
  return async (dispatch: any) => {
    const response = await axios.patch(
      `listCommentData/${uidComment}.json`,
      {
        listLike: listLike,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: UPDATE_LISTLIKE_COMMENT,
      payload: {
        uid: uidComment,
        listLike: listLike,
      },
    });
  };
};

export const updateNewComment = (userUid: string, content: string, postUid: string) => {
  return async (dispatch: any, getState: any) => {
    const rootState = getState();
    const timeUpload = Date.now();
    const newCommentRes = await axios.post('listCommentData.json', {
      owner: userUid,
      content: content,
      timeUpload: timeUpload,
    });

    let thisPost;
    for (let index = 0; index < rootState.postState.postData.length; index++) {
      if (rootState.postState.postData[index].id === postUid) thisPost = rootState.postState.postData[index];
    }
    const newListComment = [...thisPost.listComment, newCommentRes.data.name];

    await axios.patch(
      `postData/${postUid}.json`,
      { listComment: newListComment },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(newListComment);
    dispatch({
      type: 'UPDATE_LIST_COMMENT',
      payload: {
        newComment: {
          id: newCommentRes.data,
          owner: userUid,
          content: content,
          listLike: [],
          timeUpload: timeUpload,
        },
      },
    });
  };
};
