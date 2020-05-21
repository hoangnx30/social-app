import React from 'react';
import { View, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
interface Props {
  urlImage: string;
  handleClose: any;
}

const ImagePost = ({ urlImage, handleClose }: Props) => {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        borderWidth: 1,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 20,
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', zIndex: 1000, right: 5, top: 5 }}>
        <MaterialIcons name="close" color="white" size={32} onPress={handleClose} />
      </View>
      <Image source={{ uri: urlImage }} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
    </View>
  );
};

export default ImagePost;
