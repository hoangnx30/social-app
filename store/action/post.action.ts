import firebase from 'firebase';
import { SET_POST_DATA } from './actionTypes';
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
    //createRef
    const postDataRef = firebase.database().ref('postData');
    //Sync Data
    postDataRef.on('value', (snapshoot) => {
      const postData = snapshoot.val();
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
        const usersRef = firebase.database().ref(`users/${postData[key].owner}`);
        usersRef.on('value', (userSnapshoot) => {
          postItem.username = userSnapshoot.val().fullName;
          listPostData.push(postItem);
          dispatch(setPostData(listPostData.reverse()));
        });
      }
    });
  };
};
