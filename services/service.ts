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

export const uploadPost = async (
  content: string,
  owner: string,
  listComment: ListCommentData,
  listLike: Array<string>,
  timeUpload: string,
  urlImage?: string,
  uidGroup?: string
) => {
  let urlFirebase = '';
  if (urlImage) {
    const nameFile = urlImage.slice(urlImage.lastIndexOf('/') + 1);
    const res = await fetch(urlImage);
    const dataBlob = await res.blob();
    const refFirebase = await firebase.storage().ref(`imagePost/${nameFile}`).put(dataBlob);
    urlFirebase = await refFirebase.ref.getDownloadURL();
  }
  if (!uidGroup) {
    const newPost = {
      owner: owner,
      content: content,
      listComment: listComment,
      listLike: listLike,
      timeUpload: timeUpload,
      urlImage: urlFirebase,
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
      urlImage: urlFirebase,
    };
    console.log('here2');
    firebase.database().ref(`group/${uidGroup}/ListPost`).push(newPost);
  }
};

export const editPost = async (content: string, uidPost?: string, urlImage?: string) => {
  let urlFirebase;
  if (urlImage) {
    const nameFile = urlImage.slice(urlImage.lastIndexOf('/') + 1);
    const res = await fetch(urlImage);
    const dataBlob = await res.blob();
    const refFirebase = await firebase.storage().ref(`imagePost/${nameFile}`).put(dataBlob);
    urlFirebase = await refFirebase.ref.getDownloadURL();
  }
  firebase.database().ref(`postData/${uidPost}`).update({ content: content, urlImamge: urlFirebase });
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
  return new Promise((resolve, reject) => {
    if (conOfUser1 && conOfUser2) {
      const check = conOfUser1.filter((e) => conOfUser2.includes(e));
      if (check.length > 0) {
        resolve(check[0]);
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
            .set(conOfUser2.concat([snapshot.key]));
          resolve(snapshot.key);
        });
    }
  });
};
