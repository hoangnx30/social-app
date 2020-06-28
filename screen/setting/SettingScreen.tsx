import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SettingScreen = ({ navigation }: any) => {
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
  const user = useSelector((state) => state.authState.user);
  useEffect(() => {
    verifyPermission().then(async (hasPermission) => {
      if (!hasPermission) {
        navigation.navigate('Home');
      }
      const res = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
      const imageUri = res.uri;

      if (!imageUri) {
        return;
      }
      const fetchData = await fetch(imageUri);
      const dataBlob = await fetchData.blob();

      const nameFile = imageUri.slice(imageUri.lastIndexOf('/') + 1);

      const result = await firebase.storage().ref(`avatar/${nameFile}`).put(dataBlob);
      const url = await result.ref.getDownloadURL();

      firebase
        .database()
        .ref(`users/${user.userId}`)
        .update({ avatar: url })
        .then(() => {
          navigation.navigate('Home');
        });
    });
  }, []);
  return <View></View>;
};

export default SettingScreen;
