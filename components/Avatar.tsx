import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

interface Props {
  uri?: string;
}

const Avatar = ({ uri }: Props) => {
  return (
    <View style={styles.wrapImage}>
      {uri ? (
        <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
      ) : (
        <Image source={require('../assets/avatar.png')} style={styles.image} />
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  wrapImage: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
