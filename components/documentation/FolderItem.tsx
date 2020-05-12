import React from 'react';
import moment from 'moment';
import { TouchableNativeFeedback, Text, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {} from 'react-native-gesture-handler';
import Color from '../../constants/Color';

interface Props {
  navigation?: any;
  createAt?: string;
  nameFolder?: string;
  uidFolder?: string;
}

const FolderItem = (props: Props) => {
  return (
    <TouchableNativeFeedback
      style={styles.container}
      onPress={() => props.navigation.navigate('ListDocumentation', { uidFolder: props.uidFolder })}
    >
      <View style={styles.folderItem}>
        <View>
          <MaterialCommunityIcons name="folder" size={35} color={Color.primary}/>
        </View>
        <View style={styles.wrapText}>
          <Text style={{ fontSize: 18 }}>{props.nameFolder}</Text>
          <Text style={{ color: '#aaaaaa', fontSize: 13 }}>{moment(+props.createAt).format('DD MMM YYYY h:mm A')}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FolderItem;

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
