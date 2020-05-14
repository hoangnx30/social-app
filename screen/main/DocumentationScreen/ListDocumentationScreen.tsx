import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import ButtonCircle from '../../../components/ButtonCircle';
import FileItem from '../../../components/documentation/FileItem';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  navigation: any;
  route: any;
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const ListDocumentationScreen = (props: Props) => {
  const uidFolder = props.route.params.uidFolder;
  const listFolder: Array<any> = useSelector((state) => state.documentationState.listFolder);
  const currentFolder = listFolder.length !== 0 && listFolder.find((folder) => folder.id === uidFolder);

  const transformData = () => {
    const result = [];
    for (let key in currentFolder.listFile) {
      const item = {
        id: key,
        ...currentFolder.listFile[key],
      };
      result.push(item);
    }
    return result;
  };
  const renderItem = useCallback(
    ({ item }) => {
      return <FileItem nameFile={item.nameFile} uploadAt={item.uploadAt} url={item.url} />;
    },
    [currentFolder.listFile]
  );

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

  const handleUpload = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const doc = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: '*/*',
    });
    const fileName = doc.name;
    const filleUri = doc.uri;

    const res = await fetch(filleUri);
    const fileBlob = await res.blob();

    const result = await firebase.storage().ref(`document/${fileName}`).put(fileBlob);
    const url = await result.ref.getDownloadURL();

    firebase
      .database()
      .ref(`documentation/${uidFolder}/listFile`)
      .push({ nameFile: fileName, url: url, uploadAt: Date.now() })
      .then(() => {
        Alert.alert('Upload file successfully', 'Your file have been uploaded', [{ text: 'Okay' }]);
      });
  };

  return (
    <View style={styles.screen}>
      <FlatList data={transformData()} renderItem={renderItem} />
      <ButtonCircle typeIcon="MI" iconName="cloud-upload" navigate={() => handleUpload()} />
    </View>
  );
};

export default ListDocumentationScreen;
