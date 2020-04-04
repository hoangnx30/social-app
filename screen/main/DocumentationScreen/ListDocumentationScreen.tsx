import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ListDocumentationScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>ListDocumentationScreen</Text>
    </View>
  );
};

export default ListDocumentationScreen;
