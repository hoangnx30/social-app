import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const MessageScreen = () => {
  return (
    <View style={styles.screen}>
      <GiftedChat />
    </View>
  );
};

export default MessageScreen;
