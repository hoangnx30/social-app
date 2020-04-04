import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PostScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>PostScreen</Text>
    </View>
  );
};

export default PostScreen;
