import React from 'react';
import * as firebase from 'firebase';
import { View, Text, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { PostItem } from '../../../types/postType';
import { Avatar } from 'react-native-paper';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  avatar: {
    padding: 10,
  },
  textInputWrapper: { flex: 1 },
  textInput: {
    flexShrink: 1,
    marginTop: 20,
    marginRight: 10,
    fontSize: 16,
  },
});

const uploadPost = () => {};

const UploadPostScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.avatar}>
        <Avatar.Image source={require('./../../../assets/avatar.png')} />
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={100}
          textAlignVertical="top"
          underlineColorAndroid={'transparent'}
          autoFocus={true}
          autoCapitalize="sentences"
        />
      </View>
    </View>
  );
};

export default UploadPostScreen;
