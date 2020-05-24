import React, { useState } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import Color from '../../constants/Color';

interface Props {
  url?: string;
  nameFile?: string;
  uploadAt?: string;
  navigation?: any;
  route?: any;
}

const FileItem = (props: Props) => {
  const [progress, setProgress] = useState(0);

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

  const handleDownload = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const callback = (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      setProgress(progress);
    };
    const downloadResumable = FileSystem.createDownloadResumable(
      props.url,
      `${FileSystem.documentDirectory}${props.nameFile}`,
      {},
      callback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
    } catch (e) {
      console.error(e);
    }

    try {
      await downloadResumable.pauseAsync();
      AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
    } catch (e) {
      console.error(e);
    }
    try {
      const { uri } = await downloadResumable.resumeAsync();
      saveFile(uri);
    } catch (e) {
      console.error(e);
    }

    async function saveFile(fileUri: string) {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('Download', asset, false);
        Alert.alert('Success', 'File was successfully downloaded!', [{ text: 'Okay' }]);
      } catch (error) {
        Alert.alert('No no no');
      }
    }

    //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
    const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
    const downloadSnapshot = JSON.parse(downloadSnapshotJson);
    const downloadResumabl = new FileSystem.DownloadResumable(
      downloadSnapshot.url,
      downloadSnapshot.fileUri,
      downloadSnapshot.options,
      callback,
      downloadSnapshot.resumeData
    );

    try {
      const { uri } = await downloadResumabl.resumeAsync();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableNativeFeedback style={styles.container} onPress={handleDownload}>
      <View style={styles.folderItem}>
        <View>
          <MaterialCommunityIcons name="file" size={35} color={Color.primary} />
        </View>
        <View style={styles.wrapText}>
          <Text style={{ fontSize: 18 }}>{props.nameFile}</Text>
          <Text style={{ color: '#aaaaaa', fontSize: 13 }}>{moment(+props.uploadAt).format('DD MMM YYYY h:mm A')}</Text>
        </View>
        <View style={{ right: 30, position: 'absolute' }}>
          <MaterialIcons name="cloud-download" size={35} color={Color.primary} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FileItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  wrapText: {
    marginLeft: 20,
  },
});
