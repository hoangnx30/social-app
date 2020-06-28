import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { rootReducerType } from '../../../store/reducer';
import { HomeNavigatorProps, GroupNavigatorProps } from '../../../navigation/types';
import { uploadPost, editPost } from '../../../services/service';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButtonMI } from '../../../components/HeaderButton';
import Color from '../../../constants/Color';
import ImagePost from '../../../components/ImagePost';

const UploadPostScreen = ({ route, navigation }: HomeNavigatorProps<'UpLoadPost'> & GroupNavigatorProps<'Group'>) => {
  const [content, setContent] = useState<string>('');
  const [urlImage, setUrlImage] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const uidGroup = route.params ? route.params.uidGroup : null;

  const owner = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);

  useEffect(() => {
    if (route.params) {
      if (route.params.edit) {
        const params = route.params;
        setContent(params.content);
        setUrlImage(params.urlImage);
        Image.getSize(params.urlImage, (width, height) => {
          setWidth(width / 14);
          setHeight(height / 14);
        });
      }
    }
  }, [route.params]);

  const handleUploadStatus = useCallback(() => {
    if (route.params && route.params.edit) {
      editPost(content, route.params.uidPost, urlImage);
      return;
    }

    if (!uidGroup) {
      navigation.navigate('Home');
      uploadPost(content, owner, [], [], Date.now(), urlImage);
    } else {
      uploadPost(content, owner, [], [], Date.now(), urlImage, uidGroup);
      navigation.navigate('GroupHome', { uid: uidGroup });
    }
  }, [content, urlImage]);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert('Insufficient permissions!', 'You need to grant camera permission to use this app', [
        { text: 'Okay' },
      ]);
      return false;
    }
    return true;
  };

  const handleImagePicker = useCallback(
    async (useCamera?: boolean) => {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      let res;
      let imageUri;
      if (useCamera) {
        res = await ImagePicker.launchCameraAsync({ quality: 1 });
        imageUri = res.uri;
      } else {
        res = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
        imageUri = res.uri;
      }

      if (imageUri) {
        setUrlImage(imageUri);
        Image.getSize(
          imageUri,
          (width, height) => {
            setWidth(width / 12);
            setHeight(height / 12);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    [setUrlImage]
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View>
            {/* <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMI}>
              <Item title="search" iconName="search" onPress={() => {}} />
            </HeaderButtons> */}
            <Button title="Upload" onPress={handleUploadStatus} disabled={content.length || urlImage ? false : true} />
          </View>
        );
      },
    });
  }, [handleUploadStatus, setContent]);

  return (
    <View style={styles.screen}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.avatar}>
          <Avatar.Image source={require('./../../../assets/avatar.png')} />
        </View>

        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            multiline={true}
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
      {urlImage ? (
        <ImagePost urlImage={urlImage} handleClose={() => setUrlImage('')} width={width} height={height} />
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 10,
          borderTopWidth: 1,
          width: '100%',
          paddingTop: 10,
          borderTopColor: '#eeeeee',
        }}
      >
        <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMI}>
          <Item title="image" iconName="image" color={Color.primary} onPress={() => handleImagePicker()} />
        </HeaderButtons>
        <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMI}>
          <Item title="search" iconName="camera-alt" color={Color.primary} onPress={() => handleImagePicker(true)} />
        </HeaderButtons>
      </View>
    </View>
  );
};

export default UploadPostScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
