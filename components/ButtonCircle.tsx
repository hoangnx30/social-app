import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButtonMCI, CustomHeaderButtonMI } from './HeaderButton';

const styles = StyleSheet.create({
  screen: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#eaeaea',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  iconName: string;
  typeIcon: 'MCI' | 'MI';
  navigate: () => void;
}

const ButtonCircle: React.FC<Props> = ({ iconName, typeIcon, navigate }) => {
  return (
    <View style={styles.screen}>
      <HeaderButtons HeaderButtonComponent={typeIcon === 'MCI' ? CustomHeaderButtonMCI : CustomHeaderButtonMI}>
        <Item title="comment" color="#1DA1F2" iconName={iconName} onPress={navigate}></Item>
      </HeaderButtons>
    </View>
  );
};

export default ButtonCircle;
