import firebase from 'firebase';

export const likePost = (uidPost: string, listLike: Array<string>) => {
  firebase.database().ref(`postData/${uidPost}`).update({ listLike: listLike });
};

export const likeComment = (uidPost: string, uidComment: string, listLike: Array<string>) => {
  firebase.database().ref(`postData/${uidPost}/listComment/${uidComment}`).update({ listlike: listLike });
};

export const uploadComment = (userUid: string, uidPost: string, content: string, fullName: string) => {
  const timeUpload = Date.now();
  firebase
    .database()
    .ref(`postData/${uidPost}/listComment`)
    .push({ owner: userUid, content: content, fullName: fullName, timeUpload: timeUpload });
};
