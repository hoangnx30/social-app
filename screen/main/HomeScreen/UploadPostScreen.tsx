import React, { useState, useCallback } from 'react';
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

const UploadPostScreen = ({ navigation }: any) => {
  const [content, setContent] = useState<string>('');

  const handleUploadStatus = useCallback(() => {}, []);

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
          autoCorrect={false}
          value={content}
          onChangeText={(value) => setContent(value)}
        />
      </View>
    </View>
  );
};

export default UploadPostScreen;
