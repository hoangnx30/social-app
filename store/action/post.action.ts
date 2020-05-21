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
    postDataRef.on('value', (snapshot) => {
      const postData = snapshot.val();

      const listPostData: Array<PostItem> = [];
      const listPromise = Object.keys(postData).map((key) => {
        return new Promise((resolve, reject) => {
          let postItem: PostItem = {
            id: key,
            content: postData[key].content,
            listComment: postData[key].listComment || [],
            listLike: postData[key].listLike || [],
            timeUpload: postData[key].timeUpload,
            owner: postData[key].owner,
          };
          const usersRef = firebase.database().ref(`users/${postData[key].owner}`);
          usersRef.once('value', (userSnapshot) => {
            postItem.username = userSnapshot.val().fullName;
            listPostData.push(postItem);
            resolve(postItem);
          });
        });
      });
      Promise.all(listPromise).then((res) => {
        dispatch(setPostData(res.reverse()));
      });
    });
  };
};
