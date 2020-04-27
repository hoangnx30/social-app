import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const AvatarUser = (props: any) => {
  return (
    <View style={styles.wrapImage}>
      <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
    </View>
  );
};

export default AvatarUser;

const styles = StyleSheet.create({
  wrapImage: {},
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
