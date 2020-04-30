import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import HeaderGroup from '../../../components/group/HeaderGroup';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
  },
});

const GroupHomeScreen = (props: any) => {
  return (
    <View style={styles.screen}>
      <HeaderGroup name="This is a name 's group" members={['a', 'b', 'c', 'd']} />
      <Text>This is a group</Text>
    </View>
  );
};

export default GroupHomeScreen;
