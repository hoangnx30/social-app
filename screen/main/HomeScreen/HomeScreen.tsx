import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Post from '../../../components/Post';

const HomeScreen = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    []
  );
  return (
    <View style={styles.screen}>
      <Post />
    </View>
  );
};

export default HomeScreen;
