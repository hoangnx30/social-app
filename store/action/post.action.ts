import axios from '../../config/axios-instance';
import { SET_POST_DATA, UPDATE_LISTLIKE } from './actionTypes';
import { PostItem } from './types';

const setPostData = (listPostData: Array<PostItem>) => {
  return {
    type: SET_POST_DATA,
    payload: {
      listPostData: listPostData,
    },
  };
};

export const setPostDataAsync = () => {
  return async (dispatch: any) => {
    const postRes = await axios.get('postData.json');
    const postData = postRes.data;
    const listPostData: Array<PostItem> = [];
    for (let key in postData) {
      let postItem: PostItem = {
        id: key,
        content: postData[key].content,
        listComment: postData[key].listComment || [],
        listLike: postData[key].listLike || [],
        timeUpload: postData[key].timeUpload,
        owner: postData[key].owner,
      };
      const resUser = await axios.get(`users/${postData[key].owner}.json`);
      postItem.username = resUser.data.fullName;
      listPostData.push(postItem);
    }
    dispatch(setPostData(listPostData.reverse()));
  };
};

export const uploadPostAsync = (body: any) => {
  return async (dispatch: any, getState: any) => {
    const response = await axios.post('postData.json', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
};

export const updateListLikeAsync = (uidPost: string, listLike: Array<string> | undefined) => {
  return async (dispatch: any) => {
    const response = await axios.patch(
      `postData/${uidPost}.json`,
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
      type: UPDATE_LISTLIKE,
      payload: {
        uid: uidPost,
        listLike: listLike,
      },
    });
  };
};
