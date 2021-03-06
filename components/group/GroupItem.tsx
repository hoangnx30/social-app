import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import moment from 'moment';

import AvatarGroup from './AvatarGroup';

interface Props {
  name?: string;
  createAt?: string;
  navigation?: any;
  uid?: string;
}

const GroupItem = (props: Props) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {  
        props.navigation.navigate('GroupHome', { id: props.uid, title: props.name });
      }}
    >
      <View style={styles.groupItem}>
        <View style={{ width: '95%', flexDirection: 'row', alignSelf: 'center' }}>
          <View style={styles.avatar}>
            <AvatarGroup />
          </View>
          <View>
            <Text style={styles.nameGroup} textBreakStrategy="simple">
              {props.name}
            </Text>
            <Text style={styles.timeCreated}>Create at: {moment(+props.createAt).format('DD MMM YYYY h:mm A')}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default GroupItem;
const styles = StyleSheet.create({
  groupItem: {
    width: '100%',
    paddingVertical: 7,
  },
  avatar: {
    marginRight: 10,
  },
  nameGroup: { fontSize: 20, marginTop: 5, fontWeight: '100' },
  timeCreated: { fontSize: 13, color: '#aaaaaa' },
});
