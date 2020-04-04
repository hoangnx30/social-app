import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MessagesScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>MessagesScreen</Text>
    </View>
  );
};

export default MessagesScreen;
