import firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

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

export const deleteStatus = (uidPost?: string) => {
  firebase.database().ref(`postData/${uidPost}`).remove();
};

export const uploadContent = (uidPost?: string, content?: string) => {
  firebase.database().ref(`postData/${uidPost}`).update({ content: content });
};

// con => conversation
export const createNewConversation = (
  conOfUser1: Array<string>,
  conOfUser2: Array<string>,
  userUid1: string,
  userUid2: string
) => {
  console.log(conOfUser1, conOfUser2);
  if (conOfUser1 && conOfUser2) {
    console.log('-----', conOfUser1);
    const check = conOfUser1.filter((e) => conOfUser2.includes(e));
    if (check.length > 0) {
      return;
    }
  } else {
    conOfUser1 = conOfUser1 || [];
    conOfUser2 = conOfUser2 || [];

    firebase
      .database()
      .ref('conversations')
      .push({ members: [userUid1, userUid2] })
      .then((snapshot) => {
        firebase
          .database()
          .ref(`users/${userUid1}/conversations`)
          .set(conOfUser1.concat([snapshot.key]));
        firebase
          .database()
          .ref(`users/${userUid2}/conversations`)
          .set(conOfUser1.concat([snapshot.key]));
      });
  }
};
