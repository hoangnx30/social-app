import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ListFolderDocumentationScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>ListFolderDocumentationScreen</Text>
    </View>
  );
};

export default ListFolderDocumentationScreen;
