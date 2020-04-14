import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerType } from '../../../store/reducer';
import { uploadPostAsync } from '../../../store/action/post.action';
import { HomeNavigatorProps } from '../../../navigation/types';

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

const UploadPostScreen = ({ navigation }: HomeNavigatorProps<'UpLoadPost'>) => {
  const [content, setContent] = useState<string>('');
  const dispatch = useDispatch();
  const uid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  const handleUploadStatus = useCallback(() => {
    const postData = {
      content: content,
      owner: uid,
      likeLike: [],
      listComment: [],
      timeUpload: Date.now(),
    };
    dispatch(uploadPostAsync(postData));
    navigation.navigate('Home');
  }, [dispatch, content]);
  useEffect(() => {
    navigation.setParams({ handleUpload: handleUploadStatus });
  }, [handleUploadStatus]);
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
