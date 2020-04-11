import * as firebase from 'firebase';
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
  return (dispatch: any) => {
    firebase
      .database()
      .ref('postData')
      .once('value')
      .then((response) => {
        const listPostData: Array<PostItem> = [];
        const data = response.val();
        for (let key in data) {
          const postItem: PostItem = {
            id: '',
            content: '',
            listComment: [],
            listLike: [],
            timeUpload: '',
            username: '',
          };
          postItem.id = key;
          postItem.content = data[key].content;
          postItem.listComment = data[key].listComment;
          postItem.listLike = data[key].listLike;
          postItem.timeUpload = data[key].timeUpload;
          postItem.username = data[key].fullName;
          listPostData.push(postItem);
        }
        dispatch(setPostData(listPostData));
      });
  };
};
