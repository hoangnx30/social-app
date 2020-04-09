import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DialogBottomSheet from 'reanimated-bottom-sheet';
const styles = StyleSheet.create({
  screen: {},
});

const BottomSheet = () => {
  const renderContent = {};

  const renderHeader = {};
  return (
    <View style={styles.screen}>
      <DialogBottomSheet snapPoints={[450, 300, 0]} />
    </View>
  );
};

export default BottomSheet;
