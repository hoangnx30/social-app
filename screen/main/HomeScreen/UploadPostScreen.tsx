import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { rootReducerType } from '../../../store/reducer';
import { HomeNavigatorProps, GroupNavigatorProps } from '../../../navigation/types';
import { uploadPost } from '../../../services/service';

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

const UploadPostScreen = ({ route, navigation }: HomeNavigatorProps<'UpLoadPost'> & GroupNavigatorProps<'Group'>) => {
  const [content, setContent] = useState<string>('');

  const uidGroup = route.params ? route.params.uidGroup : null;
  const owner = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  const handleUploadStatus = useCallback(() => {
    uploadPost(content, owner, [], [], Date.now(), uidGroup);
    if (!uidGroup) {
      navigation.navigate('Home');
    } else {
      navigation.replace('GroupHome', { uid: uidGroup });
    }
  }, [content]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Upload" onPress={handleUploadStatus} disabled={content.length ? false : true} />;
      },
    });
  }, [handleUploadStatus, setContent]);
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
