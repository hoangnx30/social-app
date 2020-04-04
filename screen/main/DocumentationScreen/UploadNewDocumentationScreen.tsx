import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UploadNewDocumentationScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>UploadNewDocumentationScreen</Text>
    </View>
  );
};

export default UploadNewDocumentationScreen;
