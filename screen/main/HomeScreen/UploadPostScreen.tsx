import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UploadPostScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>UploadPostScreen</Text>
    </View>
  );
};

export default UploadPostScreen;
