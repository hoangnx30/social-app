import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Modal from '../../../components/Modal';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const MessagesScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <Text>MessagesScreen</Text>
      <Modal />
    </View>
  );
};

export default MessagesScreen;
