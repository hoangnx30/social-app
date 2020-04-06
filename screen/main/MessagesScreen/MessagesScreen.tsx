import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MessagesScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <Text>MessagesScreen</Text>
      <Button title="Press" onPress={() => navigation.navigate('Message')} />
    </View>
  );
};

export default MessagesScreen;
