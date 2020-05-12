import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import Color from '../../constants/Color';

interface Props {
  url?: string;
  nameFile?: string;
  uploadAt?: string;
  navigation?: any;
  route?: any;
}

const FileItem = (props: Props) => {
  return (
    <TouchableNativeFeedback style={styles.container} onPress={() => {}}>
      <View style={styles.folderItem}>
        <View>
          <MaterialCommunityIcons name="folder" size={35} color={Color.primary} />
        </View>
        <View style={styles.wrapText}>
          <Text style={{ fontSize: 18 }}>{'ABCDEFGHIJKL'}</Text>
          <Text style={{ color: '#aaaaaa', fontSize: 13 }}>{moment(+Date.now()).format('DD MMM YYYY h:mm A')}</Text>
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
