import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GroupScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>GroupScreen</Text>
    </View>
  );
};

export default GroupScreen;
