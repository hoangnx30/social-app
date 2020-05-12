import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';

import ButtonCircle from '../../../components/ButtonCircle';
import FileItem from '../../../components/documentation/FileItem';

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

    firebase.database().ref(`documentation/${uidFolder}`).push({ nameFile: fileName, url: url, uploadAt: Date.now() });
  };
  return (
    <View style={styles.screen}>
      <FileItem />
      <ButtonCircle typeIcon="MI" iconName="cloud-upload" navigate={() => handleUpload()} />
    </View>
  );
};

export default ListDocumentationScreen;
