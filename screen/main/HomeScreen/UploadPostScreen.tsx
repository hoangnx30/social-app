import React from 'react';
import * as firebase from 'firebase';
import { View, Text, StyleSheet, Button } from 'react-native';
import { PostItem } from '../../../types/postType';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const uploadPost = () => {
  // firebase
  //   .database()
  //   .ref('postData')
  //   .push({
  //     owner: 'TI8fHBClKqcSeasZCtxQCrrlrhR2',
  //     content:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     listLike: ['jgDwMsSUtFgvwrL2tiygtPpGNHg1', 'TI8fHBClKqcSeasZCtxQCrrlrhR2'],
  //     listComment: ['jgDwMsSUtFgvwrL2tiygtPpGNHg1', 'TI8fHBClKqcSeasZCtxQCrrlrhR2'],
  //     timeUpload: Date.now(),
  //   });
  // const getPostDataPromise = firebase
  //   .database()
  //   .ref('postData')
  //   .once('value')
  // Promise.all([getPostDataPromise]).then
  // firebase
  //   .database()
  //   .ref('users/jgDwMsSUtFgvwrL2tiygtPpGNHg1')
  //   .set({
  //     email: 'xuanhoang30071999@gmail.com',
  //     fullName: 'Nguyễn Xuân Hoàng',
  //     dateOfBirth: '30/07/1999',
  //   })
  //   .then((response) => console.log(response));
  // firebase
  //   .database()
  //   .ref('postData')
  //   .once('value')
  //   .then((response) => {
  //     const listPostData: Array<PostItem> = [];
  //     const data = response.val();
  //     for (let key in data) {
  //       const postItem: PostItem = {
  //         id: '',
  //         content: '',
  //         listComment: [],
  //         listLike: [],
  //         timeUpload: '',
  //         username: '',
  //       };
  //       postItem.id = key;
  //       postItem.content = data[key].content;
  //       postItem.listComment = data[key].listComment;
  //       postItem.listLike = data[key].listLike;
  //       postItem.timeUpload = data[key].timeUpload;
  //       postItem.username = data[key].fullName;
  //       listPostData.push(postItem);
  //     }
  //     console.log(listPostData);
  //   });
};

const UploadPostScreen = () => {
  return (
    <View style={styles.screen}>
      <Button title="Upload" onPress={uploadPost} />
    </View>
  );
};

export default UploadPostScreen;
