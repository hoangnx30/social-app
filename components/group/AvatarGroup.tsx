import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const AvatarGroup = (props: any) => {
  return (
    <View style={styles.wrapImage}>
      <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
    </View>
  );
};

export default AvatarGroup;

const styles = StyleSheet.create({
  wrapImage: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});
