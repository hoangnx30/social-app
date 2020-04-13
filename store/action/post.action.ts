import axios from '../../config/axios-instance';
import { PostActionType, SET_POST_DATA } from './actionTypes';
import { PostItem } from '../../types/postType';

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
        listComment: postData[key].listComment,
        listLike: postData[key].listLike,
        timeUpload: postData[key].timeUpload,
        owner: postData[key].owner,
      };

      const resUser = await axios.get(`users/${postData[key].owner}.json`);
      postItem.username = resUser.data.fullName;
      listPostData.push(postItem);
    }
    dispatch(setPostData(listPostData));
  };
};
