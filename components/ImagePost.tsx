import React from 'react';
import { View, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
interface Props {
  urlImage: string;
  handleClose: any;
  height: number;
  width: number;
}

const ImagePost = ({ urlImage, handleClose, height, width }: Props) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 20,
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', zIndex: 1000, right: 5, top: 5 }}>
        <MaterialIcons name="close" color="black" size={32} onPress={handleClose} />
      </View>
      <Image source={{ uri: urlImage }} resizeMode="contain" style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
    </View>
  );
};

export default ImagePost;
