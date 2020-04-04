import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SettingScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>SettingSreen</Text>
    </View>
  );
};

export default SettingScreen;
