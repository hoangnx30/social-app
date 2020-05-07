import firebase from 'firebase';
import { ListCommentData } from './../store/action/types';
import { fetchGroup } from '../store/action/group.action';

export const likePost = (uidPost: string, listLike: Array<string>, uidGroup?: string) => {
  if (uidGroup) {
    firebase.database().ref(`group/${uidGroup}/ListPost/${uidPost}`).update({ listLike: listLike });
    fetchGroup();
    return;
  }
  firebase.database().ref(`postData/${uidPost}`).update({ listLike: listLike });
};

export const likeComment = (uidPost: string, uidComment: string, listLike: Array<string>, uidGroup?: string) => {
  if (uidGroup) {
    firebase
      .database()
      .ref(`group/${uidGroup}/ListPost/${uidPost}/listComment/${uidComment}`)
      .update({ listLike: listLike });
    fetchGroup();

    return;
  }
  firebase.database().ref(`postData/${uidPost}/listComment/${uidComment}`).update({ listLike: listLike });
};

export const uploadComment = (
  userUid: string,
  uidPost: string,
  content: string,
  fullName: string,
  uidGroup?: string
) => {
  const timeUpload = Date.now();
  if (uidGroup) {
    firebase
      .database()
      .ref(`group/${uidGroup}/ListPost/${uidPost}/listComment`)
      .push({ owner: userUid, content: content, timeUpload: timeUpload });
    return;
  }
  firebase
    .database()
    .ref(`postData/${uidPost}/listComment`)
    .push({ owner: userUid, content: content, fullName: fullName, timeUpload: timeUpload });
};

export const uploadPost = (
  content: string,
  owner: string,
  listComment: ListCommentData,
  listLike: Array<string>,
  timeUpload: string,
  uidPost?: string
) => {
  if (uidPost === null) {
    const newPost = {
      owner: owner,
      content: content,
      listComment: listComment,
      listLike: listLike,
      timeUpload: timeUpload,
    };
    firebase
      .database()
      .ref('postData')
      .push(newPost)
      .then((value) => console.log(value.key))
      .catch((error) => console.log(error));
  } else {
    const newPost = {
      owner: owner,
      content: content,
      listComment: listComment,
      listLike: listLike,
      timeUpload: timeUpload,
    };
    firebase.database().ref(`group/${uidPost}/ListPost`).push(newPost);
  }
};
